import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Button from "@/components/basics/Button/Button";
import Card, {
    CardContent,
    CardDescription,
    CardFigure,
    CardFooter,
    CardHeader,
    CardsGroup,
    CardTitle
} from "@/components/basics/Card/Card";
import Icon from "@/components/basics/Icon/Icon";
import { getStoryblokPostsQuery } from "@/lib/actions/queries/posts";
import dayjs from "dayjs";
import Link from "next/link";
import { FC, ViewTransition } from "react";

interface Props {}

const Page: FC<Props> = async () => {
  const postsResponse = await getStoryblokPostsQuery();
  const posts = (await postsResponse.json())?.stories;

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Nieuws & blog</ArticleTitle>
          <ArticleDescription>
            Het reilen en zeilen binnen onze scouts
          </ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent stretch>
        <CardsGroup>
          {posts?.map((post) => (
            <Link
              key={post.id}
              href={post.full_slug}
              transitionTypes={["post-open"]}
            >
              <Card>
                <CardContent>
                  <CardHeader>
                    {post.content.banner.filename && (
                      <CardFigure>
                        <img
                          src={post.content.banner.filename}
                          alt={post.name}
                        />
                      </CardFigure>
                    )}
                    <p className="text-sm flex items-center mb-1 gap-1">
                      <Icon name="time-line" className="" size="1rem" />
                      {dayjs(post.published_at).format("DD MMM. YYYY")}
                    </p>
                    <ViewTransition
                      name={`post-title-${post.id}`}
                      share={{ "post-open": "morph", default: "none" }}
                      default="none"
                    >
                      <CardTitle>{post.name}</CardTitle>
                    </ViewTransition>
                    <CardDescription>
                      {post.content.descr_short}
                    </CardDescription>
                    <CardFooter>
                      <Button variant="tertiary">
                        Meer hierover{" "}
                        <Icon
                          name="arrow-right-line"
                          className=""
                          size="1rem"
                        />
                      </Button>
                    </CardFooter>
                  </CardHeader>
                </CardContent>
              </Card>
            </Link>
          ))}
        </CardsGroup>
      </ArticleContent>
    </Article>
  );
};

export default Page;
