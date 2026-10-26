import Article, {
    ArticleBody,
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleHeaderFigure,
    ArticleSubtitle,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Boundary, { BoundaryBlock } from "@/components/basics/Boundary/Boundary";
import { getStoryblokCatchAllQuery } from "@/lib/actions/queries/pages";
import { SEO } from "@/lib/constants/static";
import { richTextResolver } from "@storyblok/richtext";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

interface Props {}

const getStory = async (slug: string[]) => {
  const storyResponse = await getStoryblokCatchAllQuery(slug);
  return storyResponse.json();
};

export const generateMetadata = async ({
  params,
}: PageProps<"/[...slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const story = (await getStory(slug))?.story;

  if (!story || story.content?.component === "redirect") return {};

  const pathname = `/${slug.join("/")}`;
  const isPost = story.full_slug?.startsWith("blog/");
  const image = story.content?.banner?.filename || SEO.image;
  const description = story.content?.descr_short || SEO.description;

  return {
    title: story.name,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type: isPost ? "article" : "website",
      title: story.name,
      description,
      url: pathname,
      images: [{ url: image, alt: story.name }],
      ...(isPost && {
        publishedTime: story.first_published_at || story.published_at,
        modifiedTime: story.updated_at,
      }),
    },
    twitter: { title: story.name, description, images: [image] },
  };
};

const Page: FC<PageProps<"/[...slug]">> = async ({ params }) => {
  const { slug } = await params;

  const story = await getStory(slug);

  if (!story?.story) return notFound();

  // Storyblok "redirects/*" stories act as short links, e.g. /trooper
  if (story.story.content?.component === "redirect") {
    const redirectUrl = story.story.content.redirect_url;
    return redirectUrl ? redirect(redirectUrl) : notFound();
  }

  const { render } = richTextResolver();
  const html: any = render(story?.story?.content?.body);

  const date = story?.story?.updated_at || story?.story?.created_at;
  const headerImageSource = story?.story?.content?.banner?.filename;
  const isHeaderImageSourceAvailable = Boolean(headerImageSource);

  const postJsonLd = story.story.full_slug?.startsWith("blog/") && {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.story.name,
    description: story.story.content?.descr_short,
    image: headerImageSource || SEO.image,
    datePublished: story.story.first_published_at || story.story.published_at,
    dateModified: story.story.updated_at,
    url: `${SEO.url}/${slug.join("/")}`,
    inLanguage: "nl-BE",
    publisher: { "@id": `${SEO.url}/#organization` },
  };

  return (
    <Boundary>
      {postJsonLd && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(postJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <BoundaryBlock>
        <Article>
          <ArticleHeader>
            <ArticleHeaderContainer>
              <ArticleTitle>{story?.story?.name}</ArticleTitle>
              <ArticleDescription>
                Laatst aangepast {dayjs(date).fromNow()}
              </ArticleDescription>
            </ArticleHeaderContainer>
            {isHeaderImageSourceAvailable && (
              <ArticleHeaderFigure>
                <img
                  src={headerImageSource}
                  alt={story?.story?.name}
                  className=""
                />
              </ArticleHeaderFigure>
            )}
            <ArticleHeaderContainer>
              <ArticleSubtitle>
                {story?.story?.content?.descr_short}
              </ArticleSubtitle>
            </ArticleHeaderContainer>
          </ArticleHeader>
          <ArticleContent>
            <ArticleBody dangerouslySetInnerHTML={{ __html: html }} />
          </ArticleContent>
        </Article>
      </BoundaryBlock>
    </Boundary>
  );
};

export default Page;
