"use client";
import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/layout/padding-container";
import PostLists from "@/components/post/post-lists";
import React from "react";

export const generateStaticParams = async () => {
  return DUMMY_CATEGORIES.map((category) => {
    return {
      category: category.slug,
    };
  });
};

const Page = ({
  params,
}: {
  params: {
    category: string;
  };
}) => {
  const posts = DUMMY_POSTS.filter(
    (post) => post.category.title.toLowerCase() === params.category
  );
  return (
    <PaddingContainer>
      <PostLists posts={posts} />
    </PaddingContainer>
  );
};

export default Page;
