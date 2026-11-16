import Article, {
    ArticleContent,
    ArticleHeader,
    ArticleHeaderContent,
    ArticleSupertitle,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Card, {
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/basics/Card/Card";
import Icon from "@/components/basics/Icon/Icon";
import { getGroups } from "@/lib/server/queries/groups";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = async () => {
  const groupsResponse = await getGroups();

  return (
    <Article>
      <ArticleHeaderContent>
        <ArticleHeader>
          <ArticleSupertitle>Haegeprekerke</ArticleSupertitle>
          <ArticleTitle>Haegeprekerke bewerken</ArticleTitle>
        </ArticleHeader>
      </ArticleHeaderContent>
      <ArticleContent>
        <ul>
          {groupsResponse.map((group) => (
            <li key={group.abbr}>
              <Link
                href={{
                  pathname: `/haegeprekerke/editor/${group.abbr}`
                }}
              >
                <Card className="flex items-center">
                  <CardContent>
                    <CardHeader>
                      <CardTitle>{group.name} </CardTitle>
                    </CardHeader>
                  </CardContent>
                  <div className="bg-neutral-50 p-2 rounded-full">
                    <Icon name="arrow-right-line" />
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </ArticleContent>
    </Article>
  );
};

export default Page;
