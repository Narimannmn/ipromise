import {
  Avatar,
  Card,
  Empty,
  Flex,
  notification,
  Spin,
  Typography,
} from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  useGetRecommendedFriends,
  useSendFollowRequest,
} from "@/entities/Follows/hooks/hooks";

export const SharedFriends = () => {
  const { data, isLoading } = useGetRecommendedFriends();
  const { mutate } = useSendFollowRequest();
  const sendRequest = (username: string) => {
    mutate(username, {
      onSuccess: () => notification.success({ message: "Send friend success" }),
    });
  };

  return (
    <Card className='min-w-[296px]'>
      <div className='flex flex-col gap-2'>
        <div>
          <Typography.Text strong>You may know</Typography.Text>
        </div>
        <div className='flex flex-col gap-1'>
          {isLoading && (
            <div className='flex justify-center'>
              <Spin size='default' />
            </div>
          )}
          {data?.length == 0 && <Empty />}
          {data?.map((friend) => (
            <div
              className='flex justify-between items-start '
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
              <div
                className='flex items-center gap-1 text-sm text-[#1890FF] cursor-pointer'
                onClick={() => sendRequest(friend.username)}
              >
                Add
                <AiOutlinePlusCircle />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
