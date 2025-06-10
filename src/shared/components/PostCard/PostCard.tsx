import { ConfigProvider, InputRef } from "antd";
import { useRef, useState } from "react";
import { Post } from "@/entities/Posts/schemas/schemas";
import { getPostById } from "@/entities/Posts/services/services";
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
  const [replyingToId, setReplyingToId] = useState<string>(post.id);
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

  const refreshPost = async () => {
    const updated = await getPostById(post.id);
    setShownPost(updated);
  };

  return (
    <ConfigProvider theme={theme}>
      <div className='rounded-2xl border border-[#d9d9d9] bg-white'>
        <PostTitle
          post={shownPost}
          onRefresh={refreshPost}
        />
        <PostBody post={shownPost} />
        <PostFooter
          post={shownPost}
          onCommentClick={() => {
            scrollToReply();
          }}
        />
        {isFooterShow && (
          <PostReplies
            post={shownPost}
            replyingToId={replyingToId}
            setReplyingToId={setReplyingToId}
            replyRef={replyRef}
            onRefresh={refreshPost}
          />
        )}
      </div>
    </ConfigProvider>
  );
};
