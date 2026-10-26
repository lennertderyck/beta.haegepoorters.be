import type { MetadataRoute } from "next";
import { SEO } from "@/lib/constants/static";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: [
      "/backoffice",
      "/ga",
      "/auth",
      "/oauth",
      "/api",
      "/haegeprekerke/editor",
    ],
  },
  sitemap: `${SEO.url}/sitemap.xml`,
  host: SEO.url,
});

export default robots;
