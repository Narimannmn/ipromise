import { Avatar, Flex, notification, Typography } from "antd";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  useAcceptFollowRequest,
  useDeclineFollowRequest,
  useGetIncomingFollowRequests,
} from "@/entities/Follows/hooks/hooks";

export const FriendshipRequests = () => {
  const { data: incomingFriendsList } = useGetIncomingFollowRequests();
  const navigate = useNavigate();

  const { mutate: declineFriendShipMutate } = useDeclineFollowRequest();
  const { mutate: acceptFriendShipMutate } = useAcceptFollowRequest();

  const declineFriendShip = (username: string) => {
    declineFriendShipMutate(username, {
      onSuccess: () => notification.error({ message: "request declined" }),
    });
  };
  const acceptFriendShip = (username: string) => {
    acceptFriendShipMutate(username, {
      onSuccess: () => notification.success({ message: "request accepted" }),
    });
  };

  if (!incomingFriendsList) return null;
  return (
    <div>
      <div className='text-lg font-semibold mb-4'>
        {incomingFriendsList?.length} requests
      </div>
      <div className='space-y-4 h-full'>
        {incomingFriendsList?.map((friend) => (
          <div
            className='flex justify-between items-center'
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
            <div className='flex gap-2 items-center '>
              <AiOutlineCheckCircle
                size={28}
                color='green'
                className='cursor-pointer'
                onClick={() => acceptFriendShip(friend.username)}
              />
              <AiOutlineCloseCircle
                size={28}
                color='red'
                className='cursor-pointer'
                onClick={() => declineFriendShip(friend.username)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
