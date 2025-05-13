import {
  Button,
  Card,
  ConfigProvider,
  Empty,
  notification,
  Spin,
  Steps,
  Typography,
} from "antd";
import { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useGetPromisesByUsername } from "@/entities/Promises/hooks/hooks";
import { privateRoutesMap } from "@/shared/navigation";
import { PromiseCrudFormTheme } from "../data/data";
import { usePromisePageStore } from "../stores/store";
import { CreatePromiseModal } from "./CreatePromiseModal/CreatePromiseModal";

export const PromisesPage = () => {
  const { user } = useAuthStore();
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { setIsCreateModal } = usePromisePageStore();
  const {
    data: promises,
    isLoading,
    error,
  } = useGetPromisesByUsername(
    username == ":username" ? user?.username : username,
  );

  useEffect(() => {
    if (error) {
      notification.error({
        message: error.message,
      });
      navigate(privateRoutesMap.feed);
    }
  }, [error]);

  return (
    <Card>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4 justify-between items-center'>
          <div>
            <Typography.Title level={4}>Promises</Typography.Title>
          </div>
          {user?.username == username && (
            <Button
              type='primary'
              icon={<AiOutlinePlusCircle size={14} />}
              onClick={() => setIsCreateModal(true)}
            >
              Create new promise
            </Button>
          )}
        </div>
        <div className='flex gap-4'>
          {promises?.length == 0 && <Empty />}
          {isLoading && (
            <div className='flex justify-center'>
              <Spin size='default' />
            </div>
          )}
          {promises?.map((promise) => {
            const description = "This is a description.";

            const steps = [
              { title: "Finished", description },
              {
                title: "In Progress",
                description,
              },
              {
                title: "Waiting",
                description,
              },
            ];
            return (
              <Card
                title={promise.Title}
                key={promise.ID}
              >
                <Steps
                  direction='vertical'
                  size='small'
                  items={steps}
                />
              </Card>
            );
          })}
        </div>
      </div>
      <ConfigProvider theme={PromiseCrudFormTheme}>
        <CreatePromiseModal />
      </ConfigProvider>
    </Card>
  );
};
