import { Button, Card, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { IPromise } from "@/entities/Promises/shemas/shemas";
import { User } from "@/entities/User/schemas/schemas";
import { PromiseProgressCard } from "../PromiseProgressCard/PromiseProgressCard";

export interface PromiseProgressCardSectionProps {
  promises: IPromise[] | null;
  selectedUserName?: User["username"];
}
export const PromiseProgressCardSection = ({
  promises,
  selectedUserName,
}: PromiseProgressCardSectionProps) => {
  if (!promises) return null;
  if (promises.length == 0) return <Empty />;

  const navigate = useNavigate();
  const displayedPromises = promises?.slice(0, 4) ?? [];

  return (
    <Card title={"Promises"}>
      <div className='flex flex-col gap-2'>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {displayedPromises.map((promise) => (
            <div
              key={promise.id}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <PromiseProgressCard promise={promise} />
            </div>
          ))}
        </div>
        <div>
          <Button
            className='w-full h-[42px]'
            onClick={() => {
              if (selectedUserName) {
                navigate(`/promises/${selectedUserName}`);
              }
              navigate("/promises");
            }}
          >
            Show all promises
          </Button>
        </div>
      </div>
    </Card>
  );
};
