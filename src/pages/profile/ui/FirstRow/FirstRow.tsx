import { Card, ConfigProvider, Flex, Spin } from "antd";
import { Badge } from "@/entities/Badges/schemas/schemas";
import { User } from "@/entities/User/schemas/schemas";
import { ProfileAvatarCardTheme } from "../../data/data";
import { BadgesBlock } from "../BadgesBlock/BadgesBlock";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export interface FirstRowProps {
  achievements: Badge[];
  isLoading: boolean;
  user?: User;
}
export const FirstRow = ({ achievements, isLoading, user }: FirstRowProps) => {
  return (
    <Flex
      vertical
      gap={16}
    >
      <ConfigProvider theme={ProfileAvatarCardTheme}>
        <Card title={<UserAvatar user={user || null} />}>
          {isLoading && (
            <div className='flex justify-center'>
              <Spin size='default' />
            </div>
          )}
          {achievements && !isLoading && <BadgesBlock badges={achievements} />}
        </Card>
      </ConfigProvider>
    </Flex>
  );
};
