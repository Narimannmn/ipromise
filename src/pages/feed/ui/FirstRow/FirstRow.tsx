import { Card, ConfigProvider } from "antd";
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
    <div className='flex flex-col gap-4'>
      <ConfigProvider theme={ProfileAvatarCardTheme}>
        <Card title={<UserAvatar user={user || null} />}>
          <div style={{ wordBreak: "break-word" }}>
            {user?.bio || "This is bio"}
          </div>
        </Card>
      </ConfigProvider>
      <BadgesCard
        badges={achievements}
        isLoading={achievementsLoading}
      />
    </div>
  );
};
