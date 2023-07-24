import { Post } from "@/types/collection";
import React from "react";
import PostContent from "./post-content";
import Image from "next/image";

interface PostHeroProps {
  post: Post;
}

const PostHero = ({ post }: PostHeroProps) => {
  return (
    <div>
      <PostContent post={post} isPostPage />
      <Image
        className="rounded-md object-cover object-center mt-6 h-[300px] md:h-[500px]"
        src={post.image}
        width={1200}
        height={500}
        alt={post.title}
      />
    </div>
  );
};

export default PostHero;
