import { Card, ConfigProvider, Flex } from "antd";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { UserAvatar } from "@/pages/feed/ui/UserAvatar/UserAvatar";
import { Badge } from "@/entities/Badges/schemas/schemas";
import { User } from "@/entities/User/schemas/schemas";
import { BadgesCard } from "@/shared/components/BadgesCard/BadgesCard";
import { ProfileAvatarCardTheme } from "../../data/data";
import { EditUserModal } from "../EditUserModal/EditUserModal";

// Adjust the import path

export interface FirstRowProps {
  achievements: Badge[] | null;
  isLoading: boolean;
  user?: User;
}

export const FirstRow = ({ achievements, isLoading, user }: FirstRowProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Flex
      vertical
      gap={16}
      className='max-w-[300px]'
    >
      <ConfigProvider theme={ProfileAvatarCardTheme}>
        <Card
          title={<UserAvatar user={user || null} />}
          extra={
            <AiOutlineEdit
              style={{ cursor: "pointer" }}
              onClick={() => setIsEditModalOpen(true)}
            />
          }
        >
          <p>{user?.bio || "This is bio"}</p>
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
