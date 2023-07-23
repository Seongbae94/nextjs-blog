import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostContent from "./post-content";

interface PostProps {
  post: Post;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <Link
      className="grid items-center grid-cols-2 gap-10"
      href={`/post/${post.slug}`}
    >
      <Image
        className="rounded-md w-full object-cover object-center max-h-[300px]"
        src={post.image}
        width={600}
        height={300}
        alt={post.title}
      />
      <PostContent post={post} />
    </Link>
  );
};

export default PostCard;
