export interface SiteConfig {
  siteName: string;
  description: string;
  currnetlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    github: string;
    linkedIn: string;
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
    github: "",
    linkedIn: "",
    instagram: "",
  },
};

export default siteConfig;
