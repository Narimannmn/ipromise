import { Statistic } from "antd";
import type { StatisticProps } from "antd";
import { useState } from "react";
import CountUp from "react-countup";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { useLikePost, useUnlikePost } from "@/entities/Posts/hooks/hooks";
import { Post } from "@/entities/Posts/schemas/schemas";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp
    end={value as number}
    separator=','
    duration={3}
  />
);

export interface PostFooterProps {
  post: Post;
  onCommentClick?: () => void;
}

export const PostFooter = ({ post, onCommentClick }: PostFooterProps) => {
  const { mutate: like } = useLikePost();
  const { mutate: unlike } = useUnlikePost();

  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.is_liked_by_me);

  const onClickLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
      unlike(post.id, {
        onError: () => {
          setLikes((prev) => prev + 1); // rollback
          setIsLiked(true);
        },
      });
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      like(post.id, {
        onError: () => {
          setLikes((prev) => prev - 1); 
          setIsLiked(false);
        },
      });
    }
  };

  return (
    <div className=' flex gap-2 '>
      <div className='px-3 py-2 flex items-center gap-1 cursor-pointer'>
        <Statistic
          value={likes}
          prefix={
            <AiOutlineLike
              color={isLiked ? "blue" : "black"}
              onClick={onClickLike}
            />
          }
          formatter={formatter}
        />
      </div>
      <div className='px-3 py-2 flex items-center gap-1 cursor-pointer'>
        <Statistic
          value={post.comments}
          prefix={
            <AiOutlineComment
              color='black'
              onClick={onCommentClick}
            />
          }
          formatter={formatter}
        />
      </div>
    </div>
  );
};
