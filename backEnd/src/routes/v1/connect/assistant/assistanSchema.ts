import { z } from "zod"
export const askAssistantSchema = z.object({
  question: z.string().min(1, "Question is required"),
})

export type AskAssistantPayloadType = z.infer<typeof askAssistantSchema>;
