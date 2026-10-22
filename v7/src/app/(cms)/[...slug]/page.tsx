import Article, {
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
import { richTextResolver } from "@storyblok/richtext";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import { FC, ViewTransition } from "react";

interface Props {}

const Page: FC<PageProps<"/[...slug]">> = async ({ params }) => {
  const { slug } = await params;

  const storyResponse = await getStoryblokCatchAllQuery(slug);
  const story = await storyResponse.json();

  if (!story?.story) return notFound();

  const { render } = richTextResolver();
  const html: any = render(story?.story?.content?.body);

  const date = story?.story?.updated_at || story?.story?.created_at;
  const headerImageSource = story?.story?.content?.banner?.filename;
  const isHeaderImageSourceAvailable = Boolean(headerImageSource);

  return (
    <Boundary>
      <BoundaryBlock>
        <Article>
          <ArticleHeader>
            <ArticleHeaderContainer>
              <ViewTransition
                name={`post-title-${story.story.id}`}
                share={{ "post-open": "morph", default: "none" }}
                default="none"
              >
                <ArticleTitle>{story?.story?.name}</ArticleTitle>
              </ViewTransition>
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
          <ArticleContent dangerouslySetInnerHTML={{ __html: html }} />
        </Article>
      </BoundaryBlock>
    </Boundary>
  );
};

export default Page;
