import { Avatar, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Post } from "@/entities/Posts/schemas/schemas";

export interface PostTitleProps {
  post: Post;
}
export const PostTitle = ({ post }: PostTitleProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex gap-2 items-center p-4 border-b border-[#d9d9d9]'>
      <Avatar
        alt='userAvatar'
        src={post.avatar_url}
        size={"default"}
      />
      <Flex vertical>
        <div className='flex gap-2 items-end'>
          <Typography.Title level={5}>
            <strong
              className='cursor-pointer hover:underline'
              onClick={() => navigate(`/profile/${post.username}`)}
            >
              {post.username}
            </strong>
          </Typography.Title>
          Promise - {post.promise_title}
        </div>
        <div className='text-[#00000073]'>{post.microtask_title} </div>
      </Flex>
    </div>
  );
};
