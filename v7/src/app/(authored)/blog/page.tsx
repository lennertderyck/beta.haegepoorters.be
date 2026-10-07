import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardsGroup,
    CardTitle
} from "@/components/basics/Card/Card";
import Icon from "@/components/basics/Icon/Icon";
import { getStoryblokPostsQuery } from "@/lib/actions/queries/posts";
import dayjs from "dayjs";
import Link from "next/link";
import { FC } from "react";

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
            <Link href={post.full_slug}>
              <Card key={post.id}>
                <CardContent>
                  <CardHeader>
                    <p className="text-sm flex items-center mb-1 gap-1">
                      <Icon name="time-line" className="" size="1rem" />
                      {dayjs(post.published_at).format("DD MMM. YYYY")}
                    </p>
                    <CardTitle>{post.name}</CardTitle>
                    <CardDescription>
                      {post.content.descr_short}
                    </CardDescription>
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
