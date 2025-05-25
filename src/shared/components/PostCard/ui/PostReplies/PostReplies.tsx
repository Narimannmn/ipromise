import { Input, InputRef } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Dispatch, SetStateAction, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "@/entities/Auth/store/store";
import { useCreateComment } from "@/entities/Posts/hooks/hooks";
import { Post } from "@/entities/Posts/schemas/schemas";

export interface PostRepliesProps {
  post: Post;
  replyRef: React.RefObject<InputRef>;
  setShownPost: Dispatch<SetStateAction<Post>>;
  replyingToId: string;
  setReplyingToId: Dispatch<SetStateAction<string>>;
}

export const PostReplies = ({
  post,
  replyRef,
  setShownPost,
  replyingToId,
  setReplyingToId,
}: PostRepliesProps) => {
  const { mutate } = useCreateComment();
  const { user } = useAuthStore();
  const [comment, setComment] = useState("");

  const handleSend = () => {
    if (!comment.trim()) return;

    const optimisticReply: Post = {
      id: uuidv4(),
      content: comment,
      username: user?.username || "You",
      avatar_url: user?.avatar_url || "",
      author_id: user?.id || "temp",
      promise_id: post.promise_id,
      promise_title: post.promise_title,
      microtask_id: post.microtask_id,
      microtask_title: post.microtask_title,
      likes: 0,
      comments: 0,
      replies: null,
      created_at: new Date().toISOString(),
      is_private: false,
      is_liked_by_me: false,
    };

    if (replyingToId === post.id) {
      setShownPost((prev) => ({
        ...prev,
        replies: [...(prev.replies || []), optimisticReply],
      }));
    } else {
      setShownPost((prev) => ({
        ...prev,
        replies: (prev.replies || []).map((r) =>
          r.id === replyingToId
            ? {
                ...r,
                replies: [...(r.replies || []), optimisticReply],
              }
            : r,
        ),
      }));
    }

    setComment("");
    setReplyingToId(post.id);

    mutate(
      { id: replyingToId, content: comment },
      {
        onError: () => {
          if (replyingToId === post.id) {
            setShownPost((prev) => ({
              ...prev,
              replies: (prev.replies || []).filter(
                (r) => r.id !== optimisticReply.id,
              ),
            }));
          } else {
            setShownPost((prev) => ({
              ...prev,
              replies: (prev.replies || []).map((r) =>
                r.id === replyingToId
                  ? {
                      ...r,
                      replies: (r.replies || []).filter(
                        (sub) => sub.id !== optimisticReply.id,
                      ),
                    }
                  : r,
              ),
            }));
          }
        },
      },
    );
  };

  return (
    <div className='px-4 py-3 border-t border-[#d9d9d9] border-b'>
      {(post.replies || []).map((reply) => (
        <div
          key={reply.id}
          className='py-2 flex flex-col gap-2 border-[#d9d9d9] border-b'
        >
          <div className='flex justify-between'>
            <div
              key={reply.id}
              className='flex gap-2 items-start  '
            >
              <img
                src={
                  reply.avatar_url ||
                  `https://ui-avatars.com/api/?name=${reply.username?.charAt(0).toUpperCase()}&background=0D8ABC&color=fff&size=128`
                }
                className='rounded-full w-6 h-6'
              />
              <div>
                <div className='text-xs font-semibold'>{reply.username}</div>
                <div className=' text-sm'>{reply.content}</div>
              </div>
            </div>
            <div className='text-gray-500 text-xs mt-1 flex flex-col gap-2 items-end'>
              <span
                className='cursor-pointer hover:underline mt-auto'
                onClick={() => {
                  setReplyingToId(reply.id);
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
            </div>
          </div>

          {(reply.replies || []).map((subReply) => (
            <div
              key={subReply.id}
              className='ml-10 flex gap-2 items-start  '
            >
              <img
                src={
                  subReply.avatar_url ||
                  `https://ui-avatars.com/api/?name=${subReply.username?.charAt(0).toUpperCase()}&background=0D8ABC&color=fff&size=128`
                }
                className='rounded-full w-4 h-4'
              />
              <div>
                <div className='text-xs font-semibold'>{subReply.username}</div>
                <div className=' text-sm'>{subReply.content}</div>
              </div>
            </div>
          ))}

          {replyingToId === reply.id && (
            <Input
              ref={replyRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Write your reply...'
              maxLength={255}
              className='bg-[#2c2c2c] border border-gray-600 rounded-md pr-10'
              prefix={
                <AiFillCaretRight
                  onClick={handleSend}
                  color='black'
                  className={`absolute right-3 top-2.5 cursor-pointer ${
                    !comment.trim()
                      ? "opacity-30 pointer-events-none"
                      : "hover:text-blue-400"
                  }`}
                />
              }
            />
          )}
        </div>
      ))}

      {/* TextArea to reply to the main post */}
      {replyingToId === post.id && (
        <div className='relative mt-4'>
          <TextArea
            ref={replyRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Write a comment...'
            autoSize={{ minRows: 1, maxRows: 3 }}
            className='bg-[#2c2c2c] border border-gray-600 rounded-md pr-10'
          />
          <AiFillCaretRight
            onClick={handleSend}
            color='black'
            className={`absolute right-3 top-2.5 cursor-pointer ${
              !comment.trim()
                ? "opacity-30 pointer-events-none"
                : "hover:text-blue-400"
            }`}
          />
        </div>
      )}
    </div>
  );
};
