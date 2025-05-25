import { Empty } from "antd";
import { Fragment } from "react";
import { Post } from "@/entities/Posts/schemas/schemas";
import { MotivationCarousel } from "../MotivationCarousel/MotivationCarousel";
import { PostCard } from "../PostCard/PostCard";

export interface PostsFeedProps {
  posts: Post[] | null;
}

export const PostsFeed = ({ posts }: PostsFeedProps) => {
  if (!posts) return <Empty />;
  if (posts.length === 0) return <Empty />;

  return (
    <div className='flex flex-col gap-4'>
      {posts.map((post, index) => (
        <Fragment key={post.id}>
          <PostCard post={post} />
          {(index + 1) % 3 === 0 && <MotivationCarousel />}
        </Fragment>
      ))}
    </div>
  );
};
