import { Empty } from "antd";
import { Fragment, useEffect, useRef } from "react";
import { Post } from "@/entities/Posts/schemas/schemas";
import { MotivationCarousel } from "../MotivationCarousel/MotivationCarousel";
import { PostCard } from "../PostCard/PostCard";

export interface PostsFeedProps {
  posts: Post[];
  onLoadMore?: () => void;
}

export const PostsFeed = ({ posts, onLoadMore }: PostsFeedProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 1.0 },
    );

    const node = observerRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [onLoadMore]);

  if (!posts || posts.length === 0) return <Empty />;

  return (
    <div className='flex flex-col gap-4'>
      {posts.map((post, index) => (
        <Fragment key={post.id}>
          <PostCard post={post} />
          {(index + 1) % 3 === 0 && <MotivationCarousel />}
        </Fragment>
      ))}
      <div ref={observerRef} />
    </div>
  );
};
