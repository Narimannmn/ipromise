import { Avatar, Flex, Typography } from "antd";
import { Post } from "@/entities/Posts/schemas/schemas";

export interface PostTitleProps {
  post: Post;
}
export const PostTitle = ({ post }: PostTitleProps) => {
  return (
    <div className='flex gap-2 items-center'>
      <Avatar
        alt='userAvatar'
        src={post.avatar_url}
        size={"default"}
      />
      <Flex vertical>
        <div className='flex gap-2 items-end'>
          <Typography.Title level={5}>{post.username}</Typography.Title>
          Promise - {post.promise_title}
        </div>
        <div className='text-[#00000073]'>{post.microtask_title} </div>
      </Flex>
    </div>
  );
};
