import { Avatar, Card, Empty, Flex, Spin, Typography } from "antd";
import { User } from "@/entities/User/schemas/schemas";

export const SharedFriends = () => {
  const isFriendsLoading = false;
  const sharedFriends: User[] = [
    {
      avatar_url: "https://example.com/avatars/user1.jpg",
      badges_count: 5,
      bio: "Frontend developer passionate about open source and UI design.",
      email: "aimgnn@mail.ru",
      followers_count: 120,
      following_count: 80,
      id: "1",
      promises_count: 10,
      role: "admin",
      username: "aimgnn",
    },
    {
      avatar_url: "https://example.com/avatars/user2.jpg",
      badges_count: 2,
      bio: "Software engineering student and backend enthusiast.",
      email: "ansar.dev@gmail.com",
      followers_count: 45,
      following_count: 60,
      id: "2",
      promises_count: 3,
      role: "student",
      username: "ansarU",
    },
    {
      avatar_url: "https://example.com/avatars/user3.jpg",
      badges_count: 7,
      bio: "Building bridges between code and creativity.",
      email: "amina.codes@gmail.com",
      followers_count: 200,
      following_count: 150,
      id: "3",
      promises_count: 25,
      role: "teacher",
      username: "aminakz",
    },
  ];
  return (
    <Card>
      <div className='flex flex-col gap-2'>
        <div>
          <Typography.Text strong>You may know</Typography.Text>
        </div>
        <div className='flex flex-col'>
          {isFriendsLoading && (
            <div className='flex justify-center'>
              <Spin size='default' />
            </div>
          )}
          {sharedFriends.length == 0 && <Empty />}
          {sharedFriends.map((friend) => (
            <div
              className='flex justify-between'
              key={friend.id}
            >
              <Flex gap={8}>
                <Avatar
                  alt='userAvatar'
                  src={friend.avatar_url}
                  size={"default"}
                />
                <Flex
                  vertical
                  gap={4}
                >
                  <Typography.Text>{friend.username}</Typography.Text>
                  <Typography.Text>
                    {friend.bio || "This is bio"}
                  </Typography.Text>
                </Flex>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
