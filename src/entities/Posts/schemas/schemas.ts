import { z, ZodType } from "zod";

export type Post = {
  id: string;
  content: string;
  author_id: string;
  username: string;
  promise_id: string;
  promise_title: string;
  microtask_id: string;
  microtask_title: string;
  likes: number;
  comments: number;
  replies: Post[] | null;
  created_at: string;
  avatar_url?: string;
  attachments?: string[];
  // is_private: boolean;
};

export const PostSchema: ZodType<Post> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    content: z.string(),
    author_id: z.string().uuid(),
    username: z.string(),
    promise_id: z.string().uuid(),
    promise_title: z.string(),
    microtask_id: z.string().uuid(),
    microtask_title: z.string(),
    likes: z.number(),
    comments: z.number(),
    replies: z.union([z.array(PostSchema), z.null()]),
    created_at: z.string().datetime(),
    avatar_url: z.string().optional(),
    attachments: z.array(z.string()).optional(),
    // is_private: z.boolean(),
  }),
);

export const CreatePostSchema = z.object({
  microtask_id: z.string().uuid({ message: "Invalid microtask_id" }),
  promise_id: z.string().uuid({ message: "Invalid promise_id" }).optional(),
  content: z.string().min(1, { message: "Content cannot be empty" }),
  attachments: z.array(z.instanceof(File)).optional(),
});

export type CreatePostRequest = z.infer<typeof CreatePostSchema>;

export const getPostsByUserNameSchema = z.object({
  posts: z.array(PostSchema),
});
