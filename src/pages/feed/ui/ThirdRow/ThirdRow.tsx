import { Flex } from "antd";
import { NotificationsBlock } from "@/pages/profile/ui/NotificationsBlock/NotificationsBlock";
import { SharedFriends } from "@/shared/components/SharedFriends/SharedFriends";

export const ThirdRow = () => {
  return (
    <Flex
      vertical
      gap={16}
      className='w-[350px]'
    >
      <NotificationsBlock />
      <SharedFriends />
    </Flex>
  );
};
