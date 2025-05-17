import { Avatar, Flex, Typography } from "antd";
import { useGetSentFollowRequests } from "@/entities/Follows/hooks/hooks";

export const SentFollowRequests = () => {
  const { data: sentFollowRequests } = useGetSentFollowRequests();
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
