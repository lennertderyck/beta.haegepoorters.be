import type { MetadataRoute } from "next";
import { getGroups } from "@/lib/actions/queries/groups";
import {
  getStoryblokSitemapStoriesQuery,
  STORYBLOK_ROOT_PREFIXES,
} from "@/lib/actions/queries/pages";
import { SEO } from "@/lib/constants/static";

export const revalidate = 3600;

const STATIC_ROUTES = ["/", "/haegeprekerke", "/blog", "/leiding", "/contact"];

const getStories = async (startsWith: string) => {
  const response = await getStoryblokSitemapStoriesQuery(startsWith)();
  if (!response.ok) return [];
  return (await response.json()).stories ?? [];
};

/** Strip folders that are served at the site root, e.g. "pagina/vzw" -> "vzw" */
const toPathname = (fullSlug: string) => {
  const prefix = STORYBLOK_ROOT_PREFIXES.find((prefix) =>
    fullSlug.startsWith(`${prefix}/`),
  );
  return `/${prefix ? fullSlug.slice(prefix.length + 1) : fullSlug}`;
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [groups, posts, ...pages] = await Promise.all([
    getGroups().catch(() => []),
    getStories("blog/"),
    ...STORYBLOK_ROOT_PREFIXES.map((prefix) => getStories(`${prefix}/`)),
  ]);

  return [
    ...STATIC_ROUTES.map((pathname) => ({
      url: SEO.url + pathname,
      changeFrequency: "weekly" as const,
      priority: pathname === "/" ? 1 : 0.8,
    })),
    ...groups.map((group) => ({
      url: `${SEO.url}/haegeprekerke/${group.abbr}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: SEO.url + toPathname(post.full_slug),
      lastModified: post.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...pages.flat().map((page) => ({
      url: SEO.url + toPathname(page.full_slug),
      lastModified: page.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
};

export default sitemap;
