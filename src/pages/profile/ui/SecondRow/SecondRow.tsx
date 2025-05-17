import { Flex, Tabs } from "antd";
import { useParams } from "react-router-dom";
import { Post } from "@/entities/Posts/schemas/schemas";
import { IPromise } from "@/entities/Promises/shemas/shemas";
import { User } from "@/entities/User/schemas/schemas";
import { CreatePostSection } from "@/shared/components/CreatePostSection/CreatePostSection";
import { PostsFeed } from "@/shared/components/PostsFeed/PostsFeed";
import { PromiseProgressCardSection } from "@/shared/components/PromiseProgressCardSection/PromiseProgressCardSection";

export interface SecondRowProps {
  promises: IPromise[] | null;
  selectedUserName?: User["username"];
  posts?: Post[] | null;
}
export const SecondRow = ({
  promises,
  selectedUserName,
  posts,
}: SecondRowProps) => {
  const { username } = useParams<{ username: string }>();
  const tabItems = !username
    ? [
        {
          label: "Public",
          key: "1",
          children: (
            // <PostsFeed
            //   posts={posts?.filter((post) => !post.is_private) || null}
            // />
            <PostsFeed posts={posts || null} />
          ),
        },
        {
          label: "Private",
          key: "2",
          children: (
            // <PostsFeed
            //   posts={posts?.filter((post) => post.is_private) || null}
            // />
            <PostsFeed posts={posts || null} />
          ),
        },
      ]
    : [
        {
          label: "Public",
          key: "1",
          children: <PostsFeed posts={posts || null} />,
        },
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
      {!username && <CreatePostSection />}
      <div className='p-4'>
        <Tabs
          defaultActiveKey='1'
          items={tabItems}
        />
      </div>
    </Flex>
  );
};
