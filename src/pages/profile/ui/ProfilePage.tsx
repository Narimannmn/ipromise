import { useParams } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useGetBadgesByUsername } from "@/entities/Badges/hooks/hooks";
import { useGetPromisesByUsername } from "@/entities/Promises/hooks/hooks";
import { useGetProfileByUserName } from "@/entities/User/hooks/hooks";
import { FirstRow } from "./FirstRow/FirstRow";
import styles from "./ProfilePage.module.css";
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
    <div className={styles.feedContainer}>
      {/* Left Sidebar - Fixed */}
      <div className={styles.leftSidebar}>
        <FirstRow
          achievements={achievements || null}
          isLoading={achievementsLoading}
          user={profile}
        />{" "}
      </div>

      {/* Main Content - Scrollable */}
      <div className={styles.mainContent}>
        <SecondRow
          promises={promises || null}
          selectedUserName={selectedUserName}
        />{" "}
      </div>

      {/* Right Sidebar - Fixed */}
      <div className={styles.rightSidebar}>
        <ThirdRow />
      </div>
    </div>
  );
};
