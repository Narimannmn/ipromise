import { Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { UserAvatar } from "@/pages/feed/ui/UserAvatar/UserAvatar";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useCreatePost } from "@/entities/Posts/hooks/hooks";
import { CreatePostRequest } from "@/entities/Posts/schemas/schemas";
import { useCreatePostModalStore } from "../../store/store";
import { PostCreateForm } from "../PostCreateForm/PostCreateForm";

export const CreatePostModal = () => {
  const { isCreatePostModalOpen, setIsCreatePostModalOpen } =
    useCreatePostModalStore();
  const { user } = useAuthStore();
  const [form] = useForm<CreatePostRequest>();
  const { mutate } = useCreatePost();

  const handlePromiseFinish = async (values: CreatePostRequest) => {
    mutate(values, {
      onSuccess: () => {
        notification.success({ message: "Post created successfully" });
        setIsCreatePostModalOpen(false);
        form.resetFields();
      },
      onError: () => notification.error({ message: "Something went wrong" }),
    });
  };

  if (!user?.username) return null;

  return (
    <Modal
      title={<UserAvatar user={user} />}
      open={isCreatePostModalOpen}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        setIsCreatePostModalOpen(false);
        form.resetFields();
      }}
      okText='Create Post'
      cancelText='Cancel'
      destroyOnClose
    >
      <PostCreateForm
        form={form}
        onFinish={handlePromiseFinish}
        username={user.username}
      />
    </Modal>
  );
};
