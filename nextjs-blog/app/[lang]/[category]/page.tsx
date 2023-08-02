import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/layout/padding-container";
import PostLists from "@/components/post/post-lists";
import directus from "@/lib/directus";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";
import React from "react";
import { cache } from "react";

const getCategoryData = cache(async (categorySlug: string, locale: string) => {
  try {
    const category = await directus.items("category").readByQuery({
      filter: {
        slug: {
          _eq: categorySlug,
        },
      },
      fields: [
        "*",
        "translations.*",
        "posts.*",
        "posts.author.id",
        "posts.author.first_name",
        "posts.author.last_name",
        "posts.category.id",
        "posts.category.title",
        "posts.translations.*",
      ],
    });

    if (locale === "en") {
      return category?.data?.[0];
    } else {
      const fetchedCategory = category?.data?.[0];
      const localisedCategory = {
        ...fetchedCategory,
        title: fetchedCategory.translations[0].title,
        description: fetchedCategory.translations[0].description,
        posts: fetchedCategory.posts.map((post: any) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: post.translations[0].title,
            },
          };
        }),
      };
      return localisedCategory;
    }
  } catch (err) {
    throw new Error("Error fetching category");
  }
});

export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: { category: string; lang: string };
}) => {
  const categoryData = await getCategoryData(category, lang);

  return {
    title: categoryData?.title,
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.title,
      images: [
        {
          url: "https://localhost:3000/opengragh-image.png",
          width: 1200,
          height: 620,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/${category}`,
      },
    },
  };
};

export const generateStaticParams = async () => {
  // return DUMMY_CATEGORIES.map((category) => {
  //   return {
  //     category: category.slug,
  //   };
  // });

  try {
    const categories = await directus.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "en",
      };
    });

    const localisedParams = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "de",
      };
    });

    const allParams = params?.concat(localisedParams ?? []);
    return allParams || [];
  } catch (err) {
    throw new Error("Error fetching categories");
  }
};

const Page = async ({
  params,
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  // const category = DUMMY_CATEGORIES.find(
  //   (category) => category.slug === params.category
  // );
  // const posts = DUMMY_POSTS.filter(
  //   (post) => post.category.title.toLowerCase() === params.category
  // );

  const locale = params.lang;
  const categorySlug = params.category;

  const category = await getCategoryData(categorySlug, locale);

  console.log("59", category);

  if (!category) {
    notFound();
  }

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: Post[];
  };

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">
          {typeCorrectedCategory?.title}
        </h1>
        <p className="text-lg text-neutral-600">
          {typeCorrectedCategory?.description}
        </p>
      </div>
      <PostLists locale={locale} posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};

export default Page;
