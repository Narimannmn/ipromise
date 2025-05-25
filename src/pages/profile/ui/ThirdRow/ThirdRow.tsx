import { Flex } from "antd";
import { NotificationsBlock } from "../NotificationsBlock/NotificationsBlock";

export const ThirdRow = () => {
  return (
    <Flex
      vertical
      gap={16}
      className='max-w-[300px]'
    >
      <NotificationsBlock />
    </Flex>
  );
};
