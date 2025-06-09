import { Card, ConfigProvider, Flex } from "antd";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { UserAvatar } from "@/pages/feed/ui/UserAvatar/UserAvatar";
import { Badge } from "@/entities/Badges/schemas/schemas";
import { User } from "@/entities/User/schemas/schemas";
import { BadgesCard } from "@/shared/components/BadgesCard/BadgesCard";
import { useIsOwnProfile } from "@/shared/hooks/useIsOwnProfile";
import { ProfileAvatarCardTheme } from "../../data/data";
import { EditUserModal } from "../EditUserModal/EditUserModal";

export interface FirstRowProps {
  achievements: Badge[] | null;
  isLoading: boolean;
  user?: User;
}

export const FirstRow = ({ achievements, isLoading, user }: FirstRowProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isOwnProfile = useIsOwnProfile();

  return (
    <Flex
      vertical
      gap={16}
    >
      <ConfigProvider theme={ProfileAvatarCardTheme}>
        <Card
          title={<UserAvatar user={user || null} />}
          extra={
            isOwnProfile ? (
              <AiOutlineEdit
                style={{ cursor: "pointer" }}
                onClick={() => setIsEditModalOpen(true)}
              />
            ) : null
          }
        >
          <div style={{ wordBreak: "break-word" }}>
            {user?.bio || "This is bio"}
          </div>
        </Card>
      </ConfigProvider>

      <BadgesCard
        badges={achievements}
        isLoading={isLoading}
      />

      <EditUserModal
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        user={user || null}
      />
    </Flex>
  );
};
