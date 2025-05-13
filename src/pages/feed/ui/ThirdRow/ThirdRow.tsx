import { Flex } from "antd";
import { SharedFriends } from "@/shared/components/SharedFriends/SharedFriends";
import { NotificationsBlock } from "../NotificationsBlock/NotificationsBlock";

export const ThirdRow = () => {
  return (
    <Flex
      vertical
      gap={16}
    >
      <NotificationsBlock />
      <SharedFriends />
    </Flex>
  );
};
