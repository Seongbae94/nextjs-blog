import { Post } from "@/types/collection";
import React from "react";
import { ArrowRight } from "lucide-react";

interface PostContentProps {
  post: Post;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="space-y-2">
      <div className="text-sm flex gap-2 items-center text-neutral-400">
        <div
          className={`font-medium ${
            post.category.title === "Cities"
              ? "text-emerald-500"
              : "text-indigo-500"
          }`}
        >
          {post.category.title}
        </div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>1 min read</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>1 month ago</div>
      </div>
      <h2 className="font-medium text-3xl">{post.title}</h2>
      <p className="text-neutral-600 leading-snug">{post.description}</p>
      <div className="flex items-center gap-2 pt-3">
        Read More <ArrowRight size="14" />
      </div>
    </div>
  );
};

export default PostContent;
