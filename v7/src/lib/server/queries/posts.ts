import "server-only";

import { StoryblokQueryFactory } from "../factories";

export const getStoryblokHighlightedPostsQuery = StoryblokQueryFactory<{
  stories: Storyblok.Story<{
    descr_short: string;
  }>[];
}>("", {
  starts_with: "blog/",
  sort_by: "published_at:desc",
  per_page: "3",
  // Overviews only show the teaser, skip the full post body
  excluding_fields: "body",
});

export const getStoryblokPostsQuery = StoryblokQueryFactory<{
  stories: Storyblok.Story<{
    descr_short: string;
    banner: any;
  }>[];
}>("", {
  starts_with: "blog/",
  sort_by: "published_at:desc",
  per_page: "10",
  excluding_fields: "body",
});
