import z from "zod"

export const WebsiteSchema = z.object({
  url: z.string().url(),
  user_id: z.string(),
});

export type WebsiteInput = z.infer<typeof WebsiteSchema>;