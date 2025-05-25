import { Card, ConfigProvider, Flex } from "antd";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useGetBadgesByUsername } from "@/entities/Badges/hooks/hooks";
import { BadgesCard } from "@/shared/components/BadgesCard/BadgesCard";
import { ProfileAvatarCardTheme } from "../../data/data";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export const FirstRow = () => {
  const user = useAuthStore((state) => state.user);
  const { data: achievements = [], isLoading: achievementsLoading } =
    useGetBadgesByUsername(user?.username);

  return (
    <Flex
      vertical
      gap={16}
    >
      <ConfigProvider theme={ProfileAvatarCardTheme}>
        <Card title={<UserAvatar user={user || null} />}>
          <p>{user?.bio || "This is bio"}</p>
        </Card>
      </ConfigProvider>
      <BadgesCard
        badges={achievements}
        isLoading={achievementsLoading}
      />
    </Flex>
  );
};
