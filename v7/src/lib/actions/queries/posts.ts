import { StoryblokQueryFactory } from "../factories";

export const getStoryblokPostsQuery = StoryblokQueryFactory<{
  stories: {
    name: string;
    slug: string;
    content: {
      descr_short: string;
    };
  }[];
}>("", {
  starts_with: "blog/",
  sort_by: "published_at:desc",
  per_page: "3"
});
