import { Typography } from "antd";
import { Post } from "@/entities/Posts/schemas/schemas";

export interface PostBodyProps {
  post: Post;
}
export const PostBody = ({ post }: PostBodyProps) => {
  return (
    <>
      <div className='flex flex-col gap-2 p-4'>
        <Typography.Text>{post.content}</Typography.Text>
        {post.attachments && post.attachments.length > 0 && (
          <div className='flex gap-2'>
            {post.attachments.map((img) => (
              <img
                className='max-h-[284px]'
                key={img.id}
                src={img.file_url}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
