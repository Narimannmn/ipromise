import { Button, Card } from "antd";
import { useCreatePostModalStore } from "./store/store";
import { CreatePostModal } from "./ui/CreatePostModal/CreatePostModal";

export const CreatePostSection = () => {
  const { setIsCreatePostModalOpen } = useCreatePostModalStore();
  return (
    <Card>
      <Button
        type='primary'
        className='w-full'
        onClick={() => setIsCreatePostModalOpen(true)}
        id='create-post-button'
      >
        Write new post
      </Button>
      <CreatePostModal />
    </Card>
  );
};
