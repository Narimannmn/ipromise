import {
  Badge,
  Button,
  Card,
  Empty,
  Modal,
  Progress,
  Spin,
  Typography,
} from "antd";
import { useState } from "react";
import { AiFillOpenAI } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useGetPromisePrediction } from "@/entities/Promises/hooks/hooks";
import { IPromise } from "@/entities/Promises/shemas/shemas";
import { User } from "@/entities/User/schemas/schemas";
import { ID } from "@/shared/schemas";
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

  const [selectedPromise, setSelectedPromise] = useState<ID | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: prediction } = useGetPromisePrediction(
    selectedPromise || undefined,
  );

  const { user } = useAuthStore();

  const navigate = useNavigate();
  const displayedPromises = promises?.slice(0, 4) ?? [];

  return (
    <Card title={"Promises"}>
      <div className='flex flex-col gap-2'>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
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
              {selectedUserName == user?.username ? (
                <Badge
                  count={
                    <AiFillOpenAI
                      style={{ color: "#f5222d" }}
                      onClick={() => {
                        setSelectedPromise(promise.id);
                        setIsModalOpen(true);
                      }}
                    />
                  }
                >
                  <PromiseProgressCard promise={promise} />
                </Badge>
              ) : (
                <PromiseProgressCard promise={promise} />
              )}
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

      <Modal
        open={isModalOpen}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AiFillOpenAI style={{ fontSize: 24, color: "#1677ff" }} />
            <span>AI Advice</span>
          </div>
        }
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {prediction ? (
          <div style={{ textAlign: "center" }}>
            <div className='flex justify-center'>
              <img
                src='https://media.licdn.com/dms/image/v2/C4D0BAQH83iXcAtUaZw/company-logo_200_200/company-logo_200_200/0/1679143934699/cleverest_technologies_logo?e=2147483647&v=beta&t=UeGm2fkDhBwaZ_0Xbf4IDIA_RchdNVFEEiAwB_7-ir4'
                alt='AI Illustration'
                style={{ width: 120, marginBottom: 20 }}
              />
            </div>
            <Typography.Title level={5}>
              Here&apos;s what AI thinks:
            </Typography.Title>
            <Typography.Paragraph>
              <strong>Advice:</strong> {prediction.advice}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Success Rate:</strong>
            </Typography.Paragraph>
            <Progress
              percent={prediction.success_rate}
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              status='active'
            />
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <Spin size='large' />
            <Typography.Paragraph>Loading advice...</Typography.Paragraph>
          </div>
        )}
      </Modal>
    </Card>
  );
};
