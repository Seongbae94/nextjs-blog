import CTACard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostLists from "@/components/post/post-lists";
import directus from "@/lib/directus";
import { notFound } from "next/navigation";

export default async function Home({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const getAllPosts = async () => {
    try {
      const posts = await directus.items("post").readByQuery({
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",
        ],
      });

      if (lang === "en") {
        return posts.data;
      } else {
        const localisedPosts = posts.data?.map((post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: post.category.translations[0].title,
            },
          };
        });

        return localisedPosts;
      }

      return posts.data;
    } catch (error) {
      throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={posts[0]} locale={lang} />
        <PostLists
          locale={lang}
          posts={posts.filter((post, index) => index > 0 && index < 3)}
        />
        <CTACard locale={lang} />
        <PostCard reverse post={posts[3]} locale={lang} />
        <PostLists
          locale={lang}
          posts={posts.filter((post, index) => index > 3 && index < 6)}
        />
      </main>
    </PaddingContainer>
  );
}
