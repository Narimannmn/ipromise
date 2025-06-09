import { Flex } from "antd";
import { useParams } from "react-router-dom";
import { useInfiniteFeedPosts } from "@/entities/Posts/hooks/hooks";
import { CreatePostSection } from "@/shared/components/CreatePostSection/CreatePostSection";
import { PostsFeed } from "@/shared/components/PostsFeed/PostsFeed";

export const SecondRow = () => {
  const { username } = useParams<{ username: string }>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFeedPosts();

  const posts = data?.pages.flat() || [];
  return (
    <Flex
      vertical
      gap={16}
    >
      {!username && <CreatePostSection />}

      <PostsFeed
        posts={posts}
        onLoadMore={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
      />
    </Flex>
  );
};
