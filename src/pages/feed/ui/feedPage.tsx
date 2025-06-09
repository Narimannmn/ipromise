import { Flex } from "antd";
import { FirstRow } from "./FirstRow/FirstRow";
import { SecondRow } from "./SecondRow/SecondRow";
import { ThirdRow } from "./ThirdRow/ThirdRow";

export const feedPage = () => {
  return (
    <Flex
      gap={24}
      justify='space-between'
    >
      <div
        style={{ flex: 1 }}
        className='w-[350px]'
      >
        <FirstRow />
      </div>
      <div style={{ flex: 2 }}>
        <SecondRow />
      </div>
      <div
        style={{ flex: 1 }}
        className='w-[350px]'
      >
        <ThirdRow />
      </div>
    </Flex>
  );
};
