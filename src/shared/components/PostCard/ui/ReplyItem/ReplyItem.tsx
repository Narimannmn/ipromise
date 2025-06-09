import { InputRef } from "antd";
import { Post } from "@/entities/Posts/schemas/schemas";

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

  return (
    <div
      className={
        isSubReply
          ? "ml-10 flex gap-2 items-start"
          : "py-2 flex flex-col gap-2 border-b"
      }
    >
      <div className='flex justify-between'>
        <div className='flex gap-2 items-start'>
          <img
            src={avatar}
            className={"rounded-full w-6 h-6"}
          />
          <div>
            <div className='text-xs font-semibold'>{reply.username}</div>
            <div className='text-sm'>{reply.content}</div>
          </div>
        </div>

        {!isSubReply && (
          <span
            className='text-gray-500 text-xs mt-1 cursor-pointer hover:underline'
            onClick={() => {
              onReplyClick(reply.id);
              setTimeout(() => {
                replyRef.current?.input?.scrollIntoView({ behavior: "smooth" });
                replyRef.current?.focus();
              }, 0);
            }}
          >
            Reply
          </span>
        )}
      </div>

      {/* Sub replies */}
      {(reply.replies || []).map((sub) => (
        <ReplyItem
          key={sub.id}
          reply={sub}
          isSubReply={true}
          replyRef={replyRef}
          onReplyClick={onReplyClick}
        />
      ))}
    </div>
  );
};
