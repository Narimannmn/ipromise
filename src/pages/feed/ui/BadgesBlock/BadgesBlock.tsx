import { Avatar, Empty, Tooltip } from "antd";
import { Badge } from "@/entities/Badges/schemas/schemas";

export interface BadgesBlockProps {
  badges: Badge[] | null;
}
export const BadgesBlock = ({ badges }: BadgesBlockProps) => {
  return (
    <section className='flex flex-col gap-1'>
      <div className='flex flex-col gap-1'>
        {badges?.length == 0 && <Empty />}
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar.Group
            max={{
              count: 5,
              style: {
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                cursor: "pointer",
              },
              popover: { trigger: "click" },
            }}
          >
            {badges?.map((badge) => (
              <Tooltip
                key={badge.id}
                title={
                  <div>
                    <strong>{badge.title}</strong>
                    <br />
                    {badge.description}
                  </div>
                }
                placement='top'
              >
                <Avatar
                  shape='circle'
                  size='large'
                  src={badge.icon_url}
                  alt={badge.title}
                />
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      </div>
    </section>
  );
};
