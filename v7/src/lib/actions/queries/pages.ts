import { StoryblokQueryFactory } from "../factories";

export const getStoryblokCatchAllQuery = async (slug: string[]) => {
  const tryPrefixes = ["", "pagina"];

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
            }
          | undefined
        >;
      }>("/" + [...(prefix ? [prefix] : []), ...slug].join("/"))()
    )
  );

  const isOkAvailable = responses.find((result) => result.ok);

  // Return the first successful response if available, otherwise return the first response so a fallback is always provided.
  return isOkAvailable ? isOkAvailable : responses[0];
};
