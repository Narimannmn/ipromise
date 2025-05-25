import { Card, Empty, Flex, Modal, Spin, Typography } from "antd";
import { useState } from "react";
import { BadgesBlock } from "@/pages/feed/ui/BadgesBlock/BadgesBlock";
import { useGetAllBadges } from "@/entities/Badges/hooks/hooks";
import { Badge } from "@/entities/Badges/schemas/schemas";

export interface BadgesCardProps {
  badges: Badge[] | null;
  isLoading: boolean;
}

export const BadgesCard = ({ badges, isLoading }: BadgesCardProps) => {
  const { data: allBadges } = useGetAllBadges();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        title={"Achievments"}
        extra={
          <span
            className='cursor-pointer text-blue-500'
            onClick={() => setIsModalOpen(true)}
          >
            Show all
          </span>
        }
      >
        {isLoading && (
          <div className='flex justify-center'>
            <Spin size='default' />
          </div>
        )}
        {(badges?.length === 0 || !badges) && <Empty />}
        {badges && !isLoading && <BadgesBlock badges={badges} />}
      </Card>

      <Modal
        title='All Badges'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
      >
        {allBadges?.length ? (
          <div className='flex flex-col gap-2'>
            {allBadges.map((badge) => (
              <div key={badge.id}>
                <div className='flex gap-2 items-center p-4 border-b border-[#d9d9d9]'>
                  <img
                    alt='userAvatar'
                    src={
                      badge.icon_url ||
                      `https://ui-avatars.com/api/?name=${badge.title?.charAt(0).toUpperCase()}&background=0D8ABC&color=fff&size=128`
                    }
                    className='w-8 h-8'
                  />
                  <Flex vertical>
                    <div className='flex gap-2 items-end'>
                      <Typography.Title level={5}>
                        <strong>{badge.title}</strong>
                      </Typography.Title>
                    </div>
                    <div className='text-[#00000073]'>{badge.description} </div>
                  </Flex>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty description='No badges available' />
        )}
      </Modal>
    </>
  );
};
