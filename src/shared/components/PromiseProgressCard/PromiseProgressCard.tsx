import { Badge, Card, Typography } from "antd";
import { AiFillOpenAI } from "react-icons/ai";
import { IPromise } from "@/entities/Promises/shemas/shemas";

export interface PromiseProgressCardProps {
  promise: IPromise;
  isOwnPage: boolean;
  onClick: () => void;
}

export const PromiseProgressCard = ({
  promise,
  isOwnPage,
  onClick,
}: PromiseProgressCardProps) => {
  return (
    <Card
      className='h-full'
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex gap-4 align-middle items-center justify-between'>
          <Typography.Text>{promise.title}</Typography.Text>

          {isOwnPage ? (
            <Badge
              count={
                <AiFillOpenAI
                  style={{ color: "blue", transform: "translate(25px, -25px)" }}
                  onClick={onClick}
                />
              }
            >
              <Typography.Text>Posts</Typography.Text>
            </Badge>
          ) : (
            <Typography.Text>Posts</Typography.Text>
          )}
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
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "#b9bcc5",
                  borderRadius: "4px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${microtask.completion_ratio}%`,
                    backgroundColor: "#2563eb",
                    borderRadius: "4px",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
