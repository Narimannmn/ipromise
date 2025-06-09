import { Input, InputRef } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { useCreateComment } from "@/entities/Posts/hooks/hooks";
import { Post } from "@/entities/Posts/schemas/schemas";
import { ReplyItem } from "../ReplyItem/ReplyItem";
import { CircleChevronUpIcon } from "@/components/ui/circle-chevron-up";

export interface PostRepliesProps {
  post: Post;
  replyRef: React.RefObject<InputRef>;
  replyingToId: string;
  setReplyingToId: Dispatch<SetStateAction<string>>;
  onRefresh: () => void;
}

export const PostReplies = ({
  post,
  replyRef,
  replyingToId,
  setReplyingToId,
  onRefresh,
}: PostRepliesProps) => {
  const { mutate } = useCreateComment();
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSend = () => {
    if (!comment.trim()) return;

    mutate(
      { id: replyingToId, content: comment },
      {
        onSuccess: () => {
          setComment("");
          setReplyingToId(post.id);
          onRefresh();
        },
      },
    );
  };

  const replies = post.replies || [];
  const visibleReplies = isExpanded ? replies : replies.slice(0, 2);

  return (
    <div className='px-4 py-3 border-t border-[#d9d9d9] border-b'>
      {visibleReplies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          replyRef={replyRef}
          onReplyClick={setReplyingToId}
        />
      ))}

      {replies.length > 2 && (
        <div
          className='text-sm text-blue-500 cursor-pointer hover:underline mt-2'
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Show less" : `Show ${replies.length - 2} more replies`}
        </div>
      )}

      <div className='mt-4 flex items-center gap-2'>
        <Input
          ref={replyRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            replyingToId === post.id
              ? "Write a comment..."
              : "Reply to a comment..."
          }
          maxLength={255}
          className='flex-1 bg-[#2c2c2c] border border-gray-600 rounded-md text-white'
        />

        <div
          onClick={handleSend}
          className={"cursor-pointer rotate-90 "}
        >
          <CircleChevronUpIcon
            size={24}
            className='text-blue-500'
          />
        </div>
      </div>
    </div>
  );
};
