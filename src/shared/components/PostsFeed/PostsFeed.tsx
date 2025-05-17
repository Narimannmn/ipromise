import { Empty } from "antd";
import { Post } from "@/entities/Posts/schemas/schemas";
import { PostCard } from "../PostCard/PostCard";

export interface PostsFeedProps {
  posts: Post[] | null;
}
export const PostsFeed = ({ posts }: PostsFeedProps) => {
  if (!posts) return null;
  if (posts.length == 0) return <Empty />;

  return (
    <div className='flex flex-col gap-4'>
      {posts?.map((post) => (
        <PostCard
          post={post}
          key={post.id}
        />
      ))}
    </div>
  );
};
