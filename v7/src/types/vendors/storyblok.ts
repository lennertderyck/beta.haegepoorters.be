namespace Storyblok {
  export interface Story<Content> {
    name: string;
    created_at: string;
    published_at: string;
    updated_at: string;
    content: Content;
    slug: string;
    full_slug: string;
    first_published_at: string;
  }
}
