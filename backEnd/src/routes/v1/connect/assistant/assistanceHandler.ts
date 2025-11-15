import { FastifyReply, FastifyRequest } from "fastify";
import { AskAssistantPayloadType } from "./assistanSchema";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: 'key' });


export async function askAssistant(
    request: FastifyRequest<{ Body: AskAssistantPayloadType }>,
    reply: FastifyReply) {
    const { question } = request.body;


    try {
        reply.raw.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        });

        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: question }],
            stream: true,
        });


        for await (const chunk of stream) {
            // Each chunk contains a 'choices' array with 'delta' objects
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) {
                reply.raw.write(delta);
            }
        }

        reply.raw.end();
    } catch (err) {
        request.log.error(err);
        reply.status(500).send("Error generating response");
    }
}
