import { Avatar, Flex, Typography } from "antd";
import { User } from "@/entities/User/schemas/schemas";

export interface UserAvatarProps {
  user: User | null;
}
export const UserAvatar = ({ user }: UserAvatarProps) => {
  if (!user) return null;
  return (
    <Flex gap={8}>
      <Avatar
        alt='userAvatar'
        src={user.avatar_url}
        size={"large"}
      />
      <Flex
        vertical
        gap={4}
      >
        <Typography.Title level={4}>{user.username}</Typography.Title>
        <Typography.Text>{user.bio || "This is bio"}</Typography.Text>
      </Flex>
    </Flex>
  );
};
