import { Empty, Progress, Typography } from "antd";
import { Badge } from "@/entities/Badges/schemas/schemas";

export interface BadgesBlockProps {
  badges: Badge[];
}
export const BadgesBlock = ({ badges }: BadgesBlockProps) => {
  return (
    <section className='flex flex-col gap-1'>
      <Typography.Text className='font-medium'>Achievments</Typography.Text>
      <div className='flex flex-col gap-1'>
        {badges.length == 0 && <Empty />}
        {badges.map((badge) => (
          <div
            className='flex flex-col'
            key={badge.id}
          >
            <Typography.Text>{badge.title}</Typography.Text>
            <Progress
              percent={30}
              showInfo={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
