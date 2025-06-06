import { Avatar, Flex, notification, Typography } from "antd";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import {
  useGetSentFollowRequests,
  useRemoveFollowRequest,
} from "@/entities/Follows/hooks/hooks";
import styles from "./../FriendsPage.module.css";
import { XIcon } from "@/components/ui/x";

export const SentFollowRequests = () => {
  const navigate = useNavigate();

  const { data: sentFollowRequests } = useGetSentFollowRequests();
  const { mutate } = useRemoveFollowRequest();
  const declineFriendShip = (username: string) => {
    mutate(username, {
      onSuccess: () => notification.error({ message: "request declined" }),
    });
  };
  if (!sentFollowRequests) return null;
  return (
    <div>
      <div className='text-lg font-semibold mb-4'>
        {sentFollowRequests?.length} requests
      </div>
      <div className='space-y-4 h-full'>
        {sentFollowRequests?.map((friend) => (
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
                    <strong
                      className='cursor-pointer hover:underline'
                      onClick={() => navigate(`/profile/${friend.username}`)}
                    >
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
            <XIcon
              size={28}
              color='red'
              className={clsx("cursor-pointer", styles.red)}
              onClick={() => declineFriendShip(friend.username)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
