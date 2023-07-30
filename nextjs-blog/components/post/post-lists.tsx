import { Post } from "@/types/collection";
import React from "react";
import PostCard from "./post-card";

interface PostListProps {
  locale: string;
  posts: Post[];
  layout?: "vertical" | "horizontal";
}

const PostLists = ({ locale, posts, layout = "vertical" }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-flow-col lg:auto-cols-fr">
      {posts.map((post) => {
        return (
          <PostCard locale={locale} layout={layout} post={post} key={post.id} />
        );
      })}
    </div>
  );
};

export default PostLists;
