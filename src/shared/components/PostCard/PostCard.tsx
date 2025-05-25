import { ConfigProvider, InputRef } from "antd";
import { useRef, useState } from "react";
import { Post } from "@/entities/Posts/schemas/schemas";
import { theme } from "./data/data";
import { PostBody } from "./ui/PostBody/PostBody";
import { PostFooter } from "./ui/PostFooter/PostFooter";
import { PostReplies } from "./ui/PostReplies/PostReplies";
import { PostTitle } from "./ui/PostTitle/PostTitle";

export interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [shownPost, setShownPost] = useState<Post>(post);
  const [replyingToId, setReplyingToId] = useState<string>(post.id); // allow replying to post too
  const [isFooterShow, setIsFooterShow] = useState<boolean>(true);
  const replyRef = useRef<InputRef>(null);

  const scrollToReply = () => {
    replyRef.current?.input?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    replyRef.current?.focus();
    setReplyingToId(post.id);
    setIsFooterShow(true);
  };

  return (
    <ConfigProvider theme={theme}>
      <div className='rounded-2xl border border-[#d9d9d9] bg-white'>
        <PostTitle post={shownPost} />
        <PostBody post={shownPost} />
        <PostFooter
          post={shownPost}
          onCommentClick={scrollToReply}
        />
        {isFooterShow && (
          <PostReplies
            post={shownPost}
            setShownPost={setShownPost}
            replyingToId={replyingToId}
            setReplyingToId={setReplyingToId}
            replyRef={replyRef}
          />
        )}
      </div>
    </ConfigProvider>
  );
};
