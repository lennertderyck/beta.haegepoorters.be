import { StoryblokQueryFactory } from "../factories";

/** Prefixes of Storyblok folders that are served at the site root */
export const STORYBLOK_ROOT_PREFIXES = ["pagina"];

export const getStoryblokSitemapStoriesQuery = (startsWith: string) =>
  StoryblokQueryFactory<{
    stories: Storyblok.Story<{ component: string }>[];
  }>("", {
    starts_with: startsWith,
    per_page: "100",
    excluding_fields: "body",
  });

export const getStoryblokCatchAllQuery = async (slug: string[]) => {
  const tryPrefixes = ["", ...STORYBLOK_ROOT_PREFIXES, "redirects"];

  const responses = await Promise.all(
    tryPrefixes.map((prefix) =>
      StoryblokQueryFactory<{
        story: Storyblok.Story<
          | {
              body: any;
              title: any;
              banner: any;
              component: string;
              shareable: boolean;
              descr_short: string;
              redirect_url?: string;
            }
          | undefined
        >;
      }>("/" + [...(prefix ? [prefix] : []), ...slug].join("/"))(),
    ),
  );

  const isOkAvailable = responses.find((result) => result.ok);

  // Return the first successful response if available, otherwise return the first response so a fallback is always provided.
  return isOkAvailable ? isOkAvailable : responses[0];
};
