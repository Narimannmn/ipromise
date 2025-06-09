import { Flex, Tabs } from "antd";
import { useState } from "react";
import { useInfiniteUserPosts } from "@/entities/Posts/hooks/hooks";
import { IPromise } from "@/entities/Promises/shemas/shemas";
import { User } from "@/entities/User/schemas/schemas";
import { CreatePostSection } from "@/shared/components/CreatePostSection/CreatePostSection";
import { PostsFeed } from "@/shared/components/PostsFeed/PostsFeed";
import { PromiseProgressCardSection } from "@/shared/components/PromiseProgressCardSection/PromiseProgressCardSection";
import { useIsOwnProfile } from "@/shared/hooks/useIsOwnProfile";

export interface SecondRowProps {
  promises: IPromise[] | null;
  selectedUserName?: User["username"];
}

export const SecondRow = ({ promises, selectedUserName }: SecondRowProps) => {
  const [activeTab, setActiveTab] = useState("public");
  const isOwnProfile = useIsOwnProfile();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteUserPosts(selectedUserName);

  const posts = data?.pages.flat() || [];

  const tabItems = [
    {
      label: "Public",
      key: "public",
      children: (
        <PostsFeed
          posts={posts.filter((post) => !post.is_private)}
          onLoadMore={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
        />
      ),
    },
    ...(isOwnProfile
      ? [
          {
            label: "Private",
            key: "private",
            children: (
              <PostsFeed
                posts={posts.filter((post) => post.is_private)}
                onLoadMore={() => {
                  if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                }}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <Flex
      vertical
      gap={16}
    >
      <PromiseProgressCardSection
        promises={promises}
        selectedUserName={selectedUserName}
      />

      {isOwnProfile && <CreatePostSection />}

      <div className='p-4'>
        <Tabs
          defaultActiveKey='public'
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={tabItems}
        />
      </div>
    </Flex>
  );
};
