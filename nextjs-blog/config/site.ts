export interface SiteConfig {
  siteName: string;
  description: string;
  currnetlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "Explorer",
  description:
    "A minimal and lovely travel blog which shares experiences and cities around the world!",
  currnetlyAt: "Korea",
  socialLinks: {
    twitter: "",
    youtube: "",
    github: "https://github.com/Seongbae94/nextjs-blog",
    linkedin: "",
    instagram: "",
  },
};

export default siteConfig;
