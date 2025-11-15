
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { CONFIG } from "src/global-config";

type Message = { role: "user" | "ai"; content: string };

export default function AIChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        const response = await fetch(`${CONFIG.baseURL}/v1/connect/assistant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ question: input }),
        });


        if (!response?.body) return;
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        const aiMessage: Message = { role: "ai", content: "" };
        setMessages((prev) => [...prev, aiMessage]);

        let buffer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            buffer += chunk;

            // Gradually add tokens from buffer
            while (buffer.length > 0) {
                const nextChar = buffer[0];
                buffer = buffer.slice(1);
                aiMessage.content += nextChar;

                // Update state
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...aiMessage };
                    return newMessages;
                });

                // small delay for typing effect
                await new Promise((r) => setTimeout(r, 10)); // 20ms per character
            }
        }

        setIsTyping(false);
    };

    return (
        <LayoutContainer>
            <Stack flexGrow={1} minHeight={0} sx={{ overflowY: "auto" }}>
                {messages.map((msg, i) => (
                    <MessageContainer key={i} role={msg.role}>
                        <MessageBox role={msg.role}>
                            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>{msg.content}</Typography>
                        </MessageBox>
                    </MessageContainer>
                ))}
                {isTyping && (
                    <Typography variant="body2" sx={{ fontStyle: "italic" }} color="text.secondary">
                        Typing...
                    </Typography>
                )}
                <div ref={messagesEndRef} />
            </Stack>
            <Box component="form" onSubmit={handleSubmit}
                sx={{
                    py: 1,
                    position: "sticky",
                    bottom: 0,
                    zIndex: 1,
                    backgroundColor: 'background.default'
                }}>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <TextField
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask something..."
                        sx={{ width: "70%" }}
                    />
                    <Button type="submit" variant="contained">
                        Send
                    </Button>
                </Stack>
            </Box>
        </LayoutContainer >
    );
}


const MessageContainer = styled("div")(({ theme, role }) => ({
    margin: "0.5rem 0",
    textAlign: role === "user" ? "right" : "left",
}));


const MessageBox = styled("span")(({ theme, role }) => ({
    background: role === "user" ? 'transparent' : theme.palette.background.paper,
    padding: "0.5rem 1rem",
    borderRadius: "15px",
    display: "inline-block",
}));


const LayoutContainer = styled('div')(() => ({
    minWidth: 0,
    display: 'flex',
    flexGrow: 1,
    // flex: '1 1 auto',
    flexDirection: 'column',
}));