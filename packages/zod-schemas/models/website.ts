import z from "zod"

export const WebsiteSchema = z.object({
  url: z.string().url(),
});


export type WebsiteInput = z.infer<typeof WebsiteSchema>;