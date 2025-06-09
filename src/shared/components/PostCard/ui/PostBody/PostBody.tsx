import { Typography } from "antd";
import { Post } from "@/entities/Posts/schemas/schemas";

export interface PostBodyProps {
  post: Post;
}

export const PostBody = ({ post }: PostBodyProps) => {
  const isSingle = post.attachments?.length === 1;

  return (
    <div className='flex flex-col gap-2 p-4'>
      <Typography.Text>{post.content}</Typography.Text>

      {post.attachments && post.attachments.length > 0 && (
        <div
          className={`${
            isSingle ? "max-w-xs" : "max-w-sm"
          } w-full grid ${isSingle ? "grid-cols-1" : "grid-cols-2"} gap-2 rounded-md overflow-hidden mt-2`}
        >
          {post.attachments.map((img) => (
            <div
              key={img.id}
              className='w-full aspect-square overflow-hidden rounded-md bg-gray-100'
            >
              <img
                src={img.file_url}
                alt={`attachment-${img.id}`}
                className='object-cover w-full h-full'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
