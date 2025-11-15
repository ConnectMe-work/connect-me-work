from fastapi import FastAPI, Request
import httpx
import subprocess
import json
import os
from pathlib import Path
import logging

CONFIG_PATH = os.getenv("INTERCEPTOR_CONFIG", "/etc/interceptor/config.json")

# --- Load configuration ---
def load_config():
    if not os.path.exists(CONFIG_PATH):
        raise FileNotFoundError(f"Configuration file not found: {CONFIG_PATH}")
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

config = load_config()

# --- Logging setup ---
log_file = config.get("logging", {}).get("file", "/tmp/interceptor.log")
os.makedirs(os.path.dirname(log_file), exist_ok=True)
logging.basicConfig(
    filename=log_file,
    level=getattr(logging, config.get("logging", {}).get("level", "INFO").upper()),
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger("interceptor")

app = FastAPI()

# --- Config shortcuts ---
OLLAMA_URL = config["ollama"]["url"]
DEFAULT_MODEL = config.get("default_model", "deepseek-r1:671b")
PGMCP_CMD = config["pgmcp"]["cmd"]
WHISPER_CFG = config["whisper"]

# --- Tool detection ---
def detect_tool_call(text: str):
    text_lower = text.lower()
    if any(x in text_lower for x in ["transcribe", ".wav", ".m4a", ".mp3"]):
        return "whisper"
    elif "database_lookup" in text_lower or "list table" in text_lower:
        return "database"
    return None

# --- Generic CLI runner ---
def run_cli(cmd_list, cwd=None):
    try:
        result = subprocess.run(
            cmd_list,
            capture_output=True,
            text=True,
            check=True,
            cwd=cwd
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        return f"[ERROR] {e.stderr.strip()}"
    except FileNotFoundError:
        return f"[ERROR] Command not found: {cmd_list[0]}"

# --- pgmcp-client wrapper ---
def run_pgmcp_client(query: str):
    return run_cli([PGMCP_CMD, "--ask", query])

# --- Whisper runner ---
def run_whisper_transcribe(file_path: str):
    file_path = Path(file_path)
    env_path = WHISPER_CFG["env_path"]
    workdir = WHISPER_CFG["workdir"]
    model = WHISPER_CFG.get("model", "medium")
    lang = WHISPER_CFG.get("language", "English")
    logger.info("FILE: {file_path}")
    if not file_path.exists():
        return f"[ERROR] Audio file not found: {file_path}"

    whisper_bin = Path(env_path) / "bin" / "whisper"
    if not whisper_bin.exists():
        return f"[ERROR] Whisper executable not found at: {whisper_bin}"

    output_txt = file_path.with_suffix(".txt")

    cmd = [
        "bash", "-c",
        f"cd {workdir} && "
        f"source {env_path}/bin/activate && "
        f"{whisper_bin} {file_path} "
        f"--model {model} "
        f"--language {lang} "
        f"--output_format txt && "
        f"deactivate"
    ]

    logger.info(f"Running Whisper: {' '.join(cmd)}")
    output = run_cli(cmd, cwd=workdir)

    if output_txt.exists():
        try:
            transcript = output_txt.read_text(encoding="utf-8").strip()
            return transcript or f"[INFO] Transcription saved at {output_txt}"
        except Exception as e:
            return f"[ERROR] Failed to read output: {e}"

    return f"[INFO] Whisper finished, but no output file found.\n{output}"

# --- Ollama call ---
async def call_ollama(model: str, prompt: str):
    async with httpx.AsyncClient(timeout=120.0) as client:
        r = await client.post(f"{OLLAMA_URL}/api/generate", json={
            "model": model,
            "prompt": prompt,
            "stream": False
        })
        r.raise_for_status()
        data = r.json()
        return data.get("response", "")

# --- Main API ---
@app.post("/api/generate")
async def handle_request(req: Request):
    body = await req.json()
    model = body.get("model", DEFAULT_MODEL)
    prompt = body.get("prompt", "")

    logger.info(f"Model {model} → {prompt}")
    response = await call_ollama(model, prompt)
    logger.info(f"Model response: {response}")

    tool = detect_tool_call(response)
    if not tool:
        return {"response": response}

    logger.info(f"Detected tool request: {tool}")

    if tool == "database":
        tool_output = run_pgmcp_client(response)
    elif tool == "whisper":
        file_path = None
        for token in response.split():
            if token.endswith((".wav", ".mp3", ".m4a")):
                file_path = token.strip('"')
                break
        if not file_path:
            return {"response": "[ERROR] No audio file path found."}
        tool_output = run_whisper_transcribe(file_path)
    else:
        tool_output = f"[INFO] Tool {tool} not implemented."

    logger.info(f"Tool output: {tool_output[:500]}...")

    followup_prompt = (
        f"The {tool} service returned the following result:\n{tool_output}\n\n"
        f"Please summarize this result for the user."
    )
    final = await call_ollama(model, followup_prompt)
    return {"response": final}

@app.get("/health")
async def health():
    return {"status": "ok"}
