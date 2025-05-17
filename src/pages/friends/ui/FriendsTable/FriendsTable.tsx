import { Avatar, Flex, notification, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetFriends } from "@/entities/Follows/hooks/hooks";
import { User } from "@/entities/User/schemas/schemas";
import { privateRoutesMap } from "@/shared/navigation";

export interface FriendsTableProps {
  selectedUserName: User["username"] | undefined;
}
export const FriendsTable = ({ selectedUserName }: FriendsTableProps) => {
  const { data: friendsList, error } = useGetFriends(selectedUserName);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      notification.error({ message: "There is no such user" });
      navigate(privateRoutesMap.feed);
    }
  }, [error]);

  if (!friendsList || !selectedUserName) return null;

  return (
    <div>
      <div className='text-lg font-semibold mb-4'>
        {friendsList?.length} Friends
      </div>
      <div className='space-y-4 h-full'>
        {friendsList?.map((friend) => (
          <div
            className='flex justify-between'
            key={friend.id}
          >
            <Flex
              gap={8}
              align='center'
            >
              <div>
                <Avatar
                  alt='userAvatar'
                  src={friend.avatar_url}
                  size={"default"}
                />
              </div>
              <Flex
                vertical
                gap={4}
              >
                <div>
                  <Typography.Text className='text-black'>
                    <strong style={{ cursor: "pointer" }}>
                      {friend.username}
                    </strong>
                  </Typography.Text>
                </div>
                <div>
                  <Typography.Text>
                    {friend.bio || "This is bio"}
                  </Typography.Text>
                </div>
              </Flex>
            </Flex>
          </div>
        ))}
      </div>
    </div>
  );
};
