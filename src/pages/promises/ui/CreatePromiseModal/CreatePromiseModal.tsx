import { Modal, notification, Spin, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { z } from "zod";
import { usePostPromise } from "@/entities/Promises/hooks/hooks";
import {
  PromiseCreate,
  PromiseCreateSchema,
} from "@/entities/Promises/shemas/shemas";
import { usePromisePageStore } from "../../stores/store";
import {
  PromiseCreateForm,
  PromiseCreateFormFields,
} from "../PromiseCreateForm/PromiseCreateForm";

export const CreatePromiseModal = () => {
  const { isCreateModalOpen, setIsCreateModal } = usePromisePageStore();
  const [form] = useForm<PromiseCreateFormFields>();

  const { mutate, isPending } = usePostPromise();
  const onFinish = (values: PromiseCreateFormFields): void => {
    try {
      const transformed: PromiseCreate = {
        ...values,
        Deadline: values.Deadline.toISOString(),
        postNumber: values.postNumber || 1,
        Microtasks: values.Microtasks.map((task, index) => ({
          Title: task.Title,
          Order: index + 1,
        })),
      };

      PromiseCreateSchema.parse(transformed);
      mutate(transformed, {
        onSuccess: () => {
          notification.success({
            message: "You successfully created Promise!",
          });
          setIsCreateModal(false);
          form.resetFields();
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("❌ Zod validation failed:", error.errors);
      }
    }
  };

  return (
    <Modal
      title={
        <div className='mb-8'>
          <Typography.Title level={3}>
            Create <span className='text-[#1890FF]'>Promise</span>
          </Typography.Title>
        </div>
      }
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => {
        setIsCreateModal(false);
        form.resetFields();
      }}
      okText={"Save Promise"}
      cancelText='Cancel'
    >
      {isPending && (
        <Spin
          size='default'
          fullscreen
        />
      )}
      <PromiseCreateForm
        form={form}
        onFinish={onFinish}
      />
    </Modal>
  );
};
