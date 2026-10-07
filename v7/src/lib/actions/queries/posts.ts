import { StoryblokQueryFactory } from "../factories";

export const getStoryblokHighlightedPostsQuery = StoryblokQueryFactory<{
  stories: Storyblok.Story<{
    descr_short: string;
  }>[];
}>("", {
  starts_with: "blog/",
  sort_by: "published_at:desc",
  per_page: "3"
});

export const getStoryblokPostsQuery = StoryblokQueryFactory<{
  stories: Storyblok.Story<{
    descr_short: string;
  }>[];
}>("", {
  starts_with: "blog/",
  sort_by: "published_at:desc",
  per_page: "10"
});
