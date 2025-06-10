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
import { useIsOwnProfile } from "@/shared/hooks/useIsOwnProfile";
import { privateRoutesMap } from "@/shared/navigation";
import { PromiseCrudFormTheme } from "../data/data";
import { usePromisePageStore } from "../stores/store";
import { CreatePromiseModal } from "./CreatePromiseModal/CreatePromiseModal";
import { EditPromiseModal } from "./EditPromiseModal/EditPromiseModal";
import { SquarePenIcon } from "@/components/ui/square-pen";

export const PromisesPage = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuthStore();
  const selectedUserName = username || user?.username;
  const isMyProfile = useIsOwnProfile();

  const navigate = useNavigate();
  const { setIsCreateModal, setSelectPromise, setIsEditModal } =
    usePromisePageStore();
  const {
    data: promises,
    isLoading,
    error,
  } = useGetPromisesByUsername(selectedUserName);

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
          {isMyProfile && (
            <Button
              type='primary'
              icon={<AiOutlinePlusCircle size={14} />}
              onClick={() => setIsCreateModal(true)}
              id='create-promise-button'
            >
              Create new promise
            </Button>
          )}
        </div>
        <div
          className='flex flex-wrap'
          style={{ gap: 16 }}
          id='progress-bar'
        >
          {(promises == null || promises.length === 0) && (
            <div className='flex justify-center w-full'>
              <Empty />
            </div>
          )}
          {isLoading && (
            <div className='flex justify-center w-full'>
              <Spin size='default' />
            </div>
          )}
          {promises?.map((promise) => {
            const steps = promise?.microtasks
              ?.sort((a, b) => a.order - b.order)
              .map((step) => {
                const isDone = step.posts_count >= step.steps_planned;
                return {
                  title: step.title,
                  description: `Made ${step.posts_count} post out of ${step.steps_planned}`,
                  status: isDone ? ("finish" as const) : ("process" as const),
                };
              });
            if (!promise) return null;
            return (
              <Card
                title={promise.title}
                extra={
                  isMyProfile ? (
                    <SquarePenIcon
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (!promise) return;
                        setSelectPromise(promise);
                        setIsEditModal(true);
                      }}
                    />
                  ) : null
                }
                key={promise.id}
                style={{
                  flex: "0 0 calc((100% / 4) - 12px)",
                  height: 350,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
                bodyStyle={{ flex: 1, overflowY: "auto" }}
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
        <EditPromiseModal />
      </ConfigProvider>
    </Card>
  );
};
