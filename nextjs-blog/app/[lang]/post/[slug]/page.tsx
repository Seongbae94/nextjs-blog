import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CTACard from "@/components/elements/cta-card";
import SocialLink from "@/components/elements/social-link";
import PaddingContainer from "@/components/layout/padding-container";
import PostBody from "@/components/post/post-body";
import PostHero from "@/components/post/post-hero";
import siteConfig from "@/config/site";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { notFound } from "next/navigation";
import { cache } from "react";

const getPostData = cache(async (postSlug: string, locale: string) => {
  try {
    const post = await directus.items("post").readByQuery({
      filter: {
        slug: {
          _eq: postSlug,
        },
      },
      fields: [
        "*",
        "category.id",
        "category.title",
        "author.id",
        "author.first_name",
        "author.last_name",
        "translations.*",
        "category.translations.*",
      ],
    });

    const postData = post?.data?.[0];

    if (locale === "en") {
      return postData;
    } else {
      const localisedPostData = {
        ...postData,
        title: postData?.translations?.[0]?.title,
        description: postData?.translations?.[0]?.description,
        body: postData?.translations?.[0]?.body,
        category: {
          ...postData?.category,
          title: postData?.category?.translations?.[0]?.title,
        },
      };
      return localisedPostData;
    }
  } catch (err) {
    // console.log(err);
    throw new Error("Error fetching post");
  }
});

export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string };
}) => {
  const post = await getPostData(slug, lang);

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      siteName: post?.title,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/post/${slug}`,
      },
    },
  };
};

export const generateStaticParams = async () => {
  // return DUMMY_POSTS.map((post) => {
  //   return {
  //     slug: post.slug,
  //   };
  // });
  try {
    const posts = await directus.items("post").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "en",
      };
    });

    const localisedParams = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "de",
      };
    });

    const allParams = params?.concat(localisedParams ?? []);

    return allParams || [];
  } catch (err) {
    throw new Error("Error fetching posts");
  }
};

const Page = async ({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  // const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

  const locale = params.lang;
  const postSlug = params.slug;

  const post = await getPostData(postSlug, locale);

  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "Article",
  //   headline: post.title,
  //   image: `${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`,
  //   author: post.author.first_name + " " + post.author.last_name,
  //   genre: post.category.title,
  //   publisher: siteConfig.siteName,
  //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postSlug}`,
  //   datePublished: new Date(post.date_created).toISOString(),
  //   dateCreated: new Date(post.date_created).toISOString(),
  //   dateModified: new Date(post.date_updated).toISOString(),
  //   description: post.description,
  //   articleBody: post.body,
  // };

  if (!post) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <PaddingContainer>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <div className="space-y-10">
        <PostHero locale={locale} post={post} />
        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative">
            <div className="sticky top-20 flex md:flex-col items-center gap-5">
              <div className="font-medium md:hidden">Share this content!</div>
              <SocialLink
                platform="twitter"
                link={`https://twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post${post.slug}`}`}
                isShareURL
              />
              <SocialLink
                platform="linkedin"
                link={`https://linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post${post.slug}`}`}
                isShareURL
              />
              <SocialLink
                platform="github"
                link={siteConfig.socialLinks.github}
                isShareURL
              />
            </div>
          </div>
          <PostBody body={post.body} />
        </div>
        <CTACard dictionary={dictionary} />
      </div>
    </PaddingContainer>
  );
};

export default Page;
