import { env } from "@/env.mjs";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  defaultTranche: string;
  links: {
    twitter: string;
    github: string;
  };
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Taxonomy",
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
  url: baseUrl,
  defaultTranche: "Silver",
  ogImage: `${baseUrl}/og.jpg`,
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/taxonomy",
  },
};
