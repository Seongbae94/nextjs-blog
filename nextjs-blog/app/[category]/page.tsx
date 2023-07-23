"use client";
import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
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
  return <div>{JSON.stringify(posts)}</div>;
};

export default Page;
