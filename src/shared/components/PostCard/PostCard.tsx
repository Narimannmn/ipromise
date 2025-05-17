import { ConfigProvider, Typography } from "antd";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { Post } from "@/entities/Posts/schemas/schemas";
import { theme } from "./data/data";
import { PostTitle } from "./ui/PostTitle/PostTitle";

export interface PostCardProps {
  post: Post;
}
export const PostCard = ({ post }: PostCardProps) => {
  return (
    <ConfigProvider theme={theme}>
      <div>
        <div className='rounded-2xl border border-[#d9d9d9] bg-white'>
          <div className='p-4 border-b border-[#d9d9d9]'>
            <PostTitle post={post} />
          </div>
          <div className='flex flex-col gap-2 p-4'>
            <Typography.Text>{post.content}</Typography.Text>
            {post.attachments && post.attachments.length > 0 && (
              <div className='flex gap-2'>
                {post.attachments.map((img) => (
                  <img
                    className='max-h-[284px]'
                    key={img}
                    src={img}
                  />
                ))}
              </div>
            )}
          </div>
          <div className='px-4 py-3 flex gap-2'>
            <div className='px-3 py-2 flex items-center gap-1 cursor-pointer'>
              <div className='flex gap'>{post.likes}</div>
              <AiOutlineLike size={16} />
            </div>
            <div className='px-3 py-2 flex items-center gap-1 cursor-pointer'>
              {post.comments}
              <AiOutlineComment size={16} />
            </div>
            ,
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
