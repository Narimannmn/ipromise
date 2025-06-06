import { Statistic } from "antd";
import type { StatisticProps } from "antd";
import clsx from "clsx";
import { useState } from "react";
import CountUp from "react-countup";
import { useLikePost, useUnlikePost } from "@/entities/Posts/hooks/hooks";
import { Post } from "@/entities/Posts/schemas/schemas";
import styles from "./PostFooter.module.css";
import { HeartIcon } from "@/components/ui/heart";
import { MessageSquareMoreIcon } from "@/components/ui/message-square-more";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp
    end={value as number}
    separator=','
    duration={1}
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
        <HeartIcon
          className={clsx({ [styles.heart]: isLiked })}
          onClick={onClickLike}
          size={16}
        />
        {likes}
      </div>
      <div className='px-3 py-2 flex items-center gap-1 cursor-pointer'>
        <Statistic
          value={post.comments}
          prefix={
            <MessageSquareMoreIcon
              color='black'
              onClick={onCommentClick}
              size={16}
            />
          }
          formatter={formatter}
        />
      </div>
    </div>
  );
};
