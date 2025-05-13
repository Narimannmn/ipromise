import { Card, ConfigProvider, Flex, Spin } from "antd";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useGetBadgesByUsername } from "@/entities/Badges/hooks/hooks";
import { ProfileAvatarCardTheme } from "../../data/data";
import { BadgesBlock } from "../BadgesBlock/BadgesBlock";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export const FirstRow = () => {
  const user = useAuthStore((state) => state.user);
  const { data: achievements = [], isPending: achievementsPending } =
    useGetBadgesByUsername(user?.username);

  return (
    <Flex
      vertical
      gap={16}
    >
      <ConfigProvider theme={ProfileAvatarCardTheme}>
        <Card title={<UserAvatar user={user} />}>
          {achievementsPending && (
            <div className='flex justify-center'>
              <Spin size='default' />
            </div>
          )}
          {achievements && <BadgesBlock badges={achievements} />}
        </Card>
      </ConfigProvider>
    </Flex>
  );
};
