import { useMutation } from "@tanstack/react-query";
import {
  Avatar,
  Dropdown,
  Flex,
  MenuProps,
  message,
  Modal,
  Typography,
} from "antd";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";
import { Post } from "@/entities/Posts/schemas/schemas";
import { deletePost } from "@/entities/Posts/services/services";

export interface PostTitleProps {
  post: Post;
  onRefresh: () => void;
}

export const PostTitle = ({ post, onRefresh }: PostTitleProps) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuthStore();

  const { mutate: deletePostMutate, isPending } = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      setModalOpen(false);
      message.success("Post deleted");
      onRefresh();
    },
    onError: () => {
      message.error("Failed to delete post");
    },
  });

  const dropdownItems: MenuProps["items"] = [
    {
      key: "delete",
      label: <span className='text-red-500'>Delete Post</span>,
      onClick: () => setModalOpen(true),
    },
  ];

  return (
    <>
      <div className='flex gap-2 justify-between items-center p-4 border-b border-[#d9d9d9]'>
        <div className='flex gap-2 items-center'>
          <Avatar
            alt='userAvatar'
            src={
              post.avatar_url ||
              `https://ui-avatars.com/api/?name=${post.username?.charAt(0).toUpperCase()}&background=0D8ABC&color=fff&size=128`
            }
            size={"default"}
          />
          <Flex vertical>
            <div className='flex gap-2 items-end'>
              <Typography.Title level={5}>
                <strong
                  className='cursor-pointer hover:underline'
                  onClick={() => navigate(`/profile/${post.username}`)}
                >
                  {post.username}
                </strong>
              </Typography.Title>
              Promise - {post.promise_title}
            </div>
            <div className='text-[#00000073]'>{post.microtask_title}</div>
          </Flex>
        </div>
        {user?.id == post.author_id && (
          <Dropdown
            menu={{ items: dropdownItems }}
            placement='bottomRight'
            trigger={["click"]}
          >
            <EllipsisVertical
              size={20}
              className='cursor-pointer'
            />
          </Dropdown>
        )}
      </div>

      <Modal
        title='Are you sure?'
        open={modalOpen}
        onOk={() => deletePostMutate()}
        onCancel={() => setModalOpen(false)}
        confirmLoading={isPending}
        okText='Yes, delete'
        okButtonProps={{ danger: true }}
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
};
