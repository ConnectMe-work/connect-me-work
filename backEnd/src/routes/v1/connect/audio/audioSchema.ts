import { z } from "zod"

export const audioResponseSchema = z.object({
    text: z.string(),
    usage: z.object({
        type: z.string(),
        seconds: z.number(),
    })
})

export type AudioResponseType = z.infer<typeof audioResponseSchema>;

