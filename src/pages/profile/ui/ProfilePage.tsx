import { Flex } from "antd";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useGetBadgesByUsername } from "@/entities/Badges/hooks/hooks";
import { useGetPromisesByUsername } from "@/entities/Promises/hooks/hooks";
import { useGetProfileByUserName } from "@/entities/User/hooks/hooks";
import { FirstRow } from "./FirstRow/FirstRow";
import { SecondRow } from "./SecondRow/SecondRow";
import { ThirdRow } from "./ThirdRow/ThirdRow";

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuthStore();
  const selectedUserName = username || user?.username;
  const { data: achievements = [], isLoading: achievementsLoading } =
    useGetBadgesByUsername(selectedUserName);
  const { data: profile } = useGetProfileByUserName(selectedUserName);
  const { data: promises } = useGetPromisesByUsername(selectedUserName);

  return (
    <Flex
      gap={24}
      justify='space-between'
    >
      <div
        style={{ flex: 1 }}
        className='max-w-[300px]'
      >
        <FirstRow
          achievements={achievements || null}
          isLoading={achievementsLoading}
          user={profile}
        />
      </div>
      <div style={{ flex: 2 }}>
        <SecondRow
          promises={promises || null}
          selectedUserName={selectedUserName}
        />
      </div>
      <div
        style={{ flex: 1 }}
        className='max-w-[300px]'
      >
        <ThirdRow />
      </div>
    </Flex>
  );
};
