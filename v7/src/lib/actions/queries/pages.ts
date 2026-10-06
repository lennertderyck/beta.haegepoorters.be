import { StoryblokQueryFactory } from "../factories";

export const getStoryblokCatchAllQuery = (slug: string[]) =>
  StoryblokQueryFactory<{
    story: Storyblok.Story<{
      body: any;
      title: any;
      banner: any;
      component: "news";
      shareable: "true";
      descr_short: "Inschrijven kinderen ZONDER voorrangsregel";
    }>;
  }>("/" + slug.join("/"))();
