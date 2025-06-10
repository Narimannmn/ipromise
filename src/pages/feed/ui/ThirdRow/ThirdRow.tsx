import { NotificationsBlock } from "@/pages/profile/ui/NotificationsBlock/NotificationsBlock";
import { SharedFriends } from "@/shared/components/SharedFriends/SharedFriends";

export const ThirdRow = () => {
  return (
    <div className='flex flex-col gap-4'>
      <NotificationsBlock />
      <SharedFriends />
    </div>
  );
};
