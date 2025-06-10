import { Tabs } from "antd";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";
import { SharedFriends } from "@/shared/components/SharedFriends/SharedFriends";
import { FriendshipRequests } from "./FriendshipRequests/FriendshipRequests";
import { FriendsTable } from "./FriendsTable/FriendsTable";
import { SentFollowRequests } from "./SentFollowRequests/SentFollowRequests";

export const FriendsPage = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuthStore();
  const selectedUserName = username ?? user?.username;

  const tabItems = !username
    ? [
        {
          label: "Friends",
          key: "1",
          children: <FriendsTable selectedUserName={selectedUserName} />,
        },
        {
          label: "Incoming Requests",
          key: "2",
          children: <FriendshipRequests />,
        },
        {
          label: "Sent Requests",
          key: "3",
          children: <SentFollowRequests />,
        },
      ]
    : [
        {
          label: "Friends",
          key: "1",
          children: <FriendsTable selectedUserName={selectedUserName} />,
        },
      ];

  return (
    <section className='w-full flex gap-6 py-[24px] px-[100px] overflow-hidden'>
      <div className='flex-3 w-3/4 p-4 bg-white rounded-2xl'>
        <Tabs
          defaultActiveKey='1'
          items={tabItems}
          id='navbar-friends'
        />
      </div>
      <div className='flex-1 w-1/4'>
        <SharedFriends />
      </div>
    </section>
  );
};
