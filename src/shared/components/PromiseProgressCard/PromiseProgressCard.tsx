import { Card, ConfigProvider, Progress, Typography } from "antd";
import { theme as defaultTheme } from "antd";
import { IPromise } from "@/entities/Promises/shemas/shemas";

export interface PromiseProgressCardProps {
  promise: IPromise;
}
export const PromiseProgressCard = ({ promise }: PromiseProgressCardProps) => {
  return (
    <Card className='h-full'>
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex gap-4 align-middle items-center justify-between'>
          <Typography.Text>{promise.title}</Typography.Text>
          <Typography.Text>Posts</Typography.Text>
        </div>
        <div className='flex flex-col gap-1'>
          {promise.microtasks?.slice(0, 3).map((microtask) => (
            <div key={microtask.id}>
              <div className='flex gap-4 align-middle items-center justify-between'>
                <Typography.Text>{microtask.title}</Typography.Text>
                <Typography.Text>
                  {microtask.posts_count}/{microtask.steps_planned}
                </Typography.Text>
              </div>
              <ConfigProvider
                theme={{
                  algorithm: defaultTheme.defaultAlgorithm,
                  cssVar: {
                    prefix: "app-",
                  },
                  token: {
                    colorWhite: "#366ef6 ",
                  },
                }}
              >
                <Progress
                  percent={microtask.completion_ratio}
                  percentPosition={{ align: "end", type: "inner" }}
                />
              </ConfigProvider>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
