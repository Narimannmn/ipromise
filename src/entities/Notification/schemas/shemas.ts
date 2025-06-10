import z from "zod";

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  type: z.enum([
    "like",
    "follow_request",
    "badge_assigned",
    "deadline_reminder",
    "post_reply",
    "comment_reply",
  ]),
  message: z.string(),
  is_read: z.boolean(),
  created_at: z.string().datetime(),
});

export type Notification = z.infer<typeof NotificationSchema>;
