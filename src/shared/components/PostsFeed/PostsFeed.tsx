import { Empty } from "antd";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Post } from "@/entities/Posts/schemas/schemas";
import { MotivationCarousel } from "../MotivationCarousel/MotivationCarousel";
import { PostCard } from "../PostCard/PostCard";

export interface PostsFeedProps {
  posts: Post[];
  onLoadMore?: () => void;
}

export const PostsFeed = ({ posts, onLoadMore }: PostsFeedProps) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && onLoadMore) onLoadMore();
  }, [inView, onLoadMore]);

  if (!posts || posts.length === 0) return <Empty />;

  return (
    <div className='flex flex-col gap-4'>
      {posts.map((post, index) => (
        <Fragment key={post.id}>
          <PostCard post={post} />
          {(index + 1) % 3 === 0 && <MotivationCarousel />}
        </Fragment>
      ))}
      <div
        ref={ref}
        style={{ minHeight: "50px" }}
      />
    </div>
  );
};
