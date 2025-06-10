import styles from "./FeedPage.module.css";
import { FirstRow } from "./FirstRow/FirstRow";
import { SecondRow } from "./SecondRow/SecondRow";
import { ThirdRow } from "./ThirdRow/ThirdRow";

export const feedPage = () => {
  return (
    <div className={styles.feedContainer}>
      {/* Left Sidebar - Fixed */}
      <div className={styles.leftSidebar}>
        <FirstRow />
      </div>

      {/* Main Content - Scrollable */}
      <div className={styles.mainContent}>
        <SecondRow />
      </div>

      {/* Right Sidebar - Fixed */}
      <div className={styles.rightSidebar}>
        <ThirdRow />
      </div>
    </div>
  );
};
