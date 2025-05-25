import { Card, ConfigProvider, Flex } from "antd";
import { UserAvatar } from "@/pages/feed/ui/UserAvatar/UserAvatar";
import { Badge } from "@/entities/Badges/schemas/schemas";
import { User } from "@/entities/User/schemas/schemas";
import { BadgesCard } from "@/shared/components/BadgesCard/BadgesCard";
import { ProfileAvatarCardTheme } from "../../data/data";

export interface FirstRowProps {
  achievements: Badge[] | null;
  isLoading: boolean;
  user?: User;
}
export const FirstRow = ({ achievements, isLoading, user }: FirstRowProps) => {
  return (
    <Flex
      vertical
      gap={16}
      className='max-w-[300px]'
    >
      <ConfigProvider theme={ProfileAvatarCardTheme}>
        <Card title={<UserAvatar user={user || null} />}>
          <p>{user?.bio || "This is bio"}</p>
        </Card>
      </ConfigProvider>
      <BadgesCard
        badges={achievements}
        isLoading={isLoading}
      />
    </Flex>
  );
};
