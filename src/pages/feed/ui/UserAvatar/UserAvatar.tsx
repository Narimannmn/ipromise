import { Avatar, Flex, Typography } from "antd";
import { User } from "@/entities/User/schemas/schemas";

export interface UserAvatarProps {
  user: User | null;
}
export const UserAvatar = ({ user }: UserAvatarProps) => {
  if (!user) return null;

  return (
    <Flex
      gap={8}
      align='center'
    >
      <Avatar
        alt='userAvatar'
        src={
          user.avatar_url ||
          `https://ui-avatars.com/api/?name=${user.username?.charAt(0).toUpperCase()}&background=0D8ABC&color=fff&size=128`
        }
        size={"large"}
      />
      <Typography.Title level={4}>{user.username}</Typography.Title>
    </Flex>
  );
};
