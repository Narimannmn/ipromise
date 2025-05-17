import { Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useUpdatePromise } from "@/entities/Promises/hooks/hooks";
import { PromiseUpdate } from "@/entities/Promises/shemas/shemas";
import { usePromisePageStore } from "../../stores/store";
import { MicrotasksManager } from "../MicrotasksManager/MicrotasksManager";
import { PromiseEditForm } from "../PromiseEditForm/PromiseEditForm";

export const EditPromiseModal = () => {
  const { isEditModalOpen, setIsEditModal, setSelectPromise, selectPromise } =
    usePromisePageStore();
  const [form] = useForm();
  const [MicrotaskManager] = useForm();

  const { mutate } = useUpdatePromise();

  const handlePromiseFinish = async (values: PromiseUpdate) => {
    if (!selectPromise) return null;
    mutate(
      { promise: values, promiseId: selectPromise!.id },
      {
        onSuccess: () => {
          setIsEditModal(false);
          setSelectPromise(null);
          form.resetFields();
        },
        onError: () => {
          notification.error({ message: "Failed to update promise" });
        },
      },
    );
  };

  if (!selectPromise) return null;

  return (
    <Modal
      title='Edit Promise'
      open={isEditModalOpen}
      onOk={() => {
        MicrotaskManager.submit();
        form.submit();
      }}
      onCancel={() => {
        setIsEditModal(false);
        setSelectPromise(null);
        form.resetFields();
      }}
      okText='Save Promise'
      cancelText='Cancel'
      destroyOnClose
    >
      <PromiseEditForm
        form={form}
        onFinish={handlePromiseFinish}
      />

      <div style={{ marginTop: 24 }}>
        <MicrotasksManager
          microtasks={selectPromise.microtasks || []}
          promiseId={selectPromise.id}
          form={MicrotaskManager}
        />
      </div>
    </Modal>
  );
};
