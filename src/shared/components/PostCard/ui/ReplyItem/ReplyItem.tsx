import { useMutation } from "@tanstack/react-query";
import { Dropdown, InputRef, MenuProps, message, Modal } from "antd";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/entities/Auth/store/store";
import { Post } from "@/entities/Posts/schemas/schemas";
import { deletePost } from "@/entities/Posts/services/services";

interface ReplyItemProps {
  reply: Post;
  isSubReply?: boolean;
  replyRef: React.RefObject<InputRef>;
  onReplyClick: (id: string) => void;
}

export const ReplyItem = ({
  reply,
  isSubReply = false,
  replyRef,
  onReplyClick,
}: ReplyItemProps) => {
  const avatar =
    reply.avatar_url ||
    `https://ui-avatars.com/api/?name=${reply.username?.charAt(0).toUpperCase()}&background=0D8ABC&color=fff&size=128`;
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);

  const { mutate: deleteReply, isPending } = useMutation({
    mutationFn: () => deletePost(reply.id),
    onSuccess: () => {
      message.success("Reply deleted");
      setModalOpen(false);
      // ❗ Тут должен быть refresh сверху — если нужно пробросить через props, скажи
    },
    onError: () => {
      message.error("Failed to delete reply");
    },
  });

  const dropdownItems: MenuProps["items"] = [
    {
      key: "delete",
      label: <span className='text-red-500'>Delete Reply</span>,
      onClick: () => setModalOpen(true),
    },
  ];

  return (
    <div
      className={
        isSubReply
          ? "ml-10 flex gap-2 items-start "
          : "py-2 flex flex-col gap-2 border-b "
      }
    >
      <div className='flex  items-start w-full justify-between'>
        <div className='flex gap-2 items-start'>
          <img
            src={avatar}
            className={"rounded-full w-6 h-6"}
          />
          <div>
            <div className='text-xs font-semibold'>
              <strong
                className='cursor-pointer hover:underline'
                onClick={() => navigate(`/profile/${reply.username}`)}
              >
                {reply.username}
              </strong>
            </div>
            <div className='text-sm'>{reply.content}</div>
          </div>
        </div>

        <div className='flex gap-2 items-center mt-1'>
          {!isSubReply && (
            <span
              className='text-gray-500 text-xs cursor-pointer hover:underline'
              onClick={() => {
                onReplyClick(reply.id);
                setTimeout(() => {
                  replyRef.current?.input?.scrollIntoView({
                    behavior: "smooth",
                  });
                  replyRef.current?.focus();
                }, 0);
              }}
            >
              Reply
            </span>
          )}

          {user?.id === reply.author_id && (
            <Dropdown
              menu={{ items: dropdownItems }}
              placement='bottomRight'
              trigger={["click"]}
            >
              <EllipsisVertical
                size={16}
                className='cursor-pointer'
              />
            </Dropdown>
          )}
        </div>
      </div>

      {(reply.replies || []).map((sub) => (
        <ReplyItem
          key={sub.id}
          reply={sub}
          isSubReply={true}
          replyRef={replyRef}
          onReplyClick={onReplyClick}
        />
      ))}

      <Modal
        title='Are you sure?'
        open={modalOpen}
        onOk={() => deleteReply()}
        onCancel={() => setModalOpen(false)}
        confirmLoading={isPending}
        okText='Yes, delete'
        okButtonProps={{ danger: true }}
      >
        <p>This reply will be permanently removed.</p>
      </Modal>
    </div>
  );
};
