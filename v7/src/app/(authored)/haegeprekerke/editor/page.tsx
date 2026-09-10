import Article, {
    ArticleContent,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import { getGroups } from "@/lib/actions/queries/groups";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = async () => {
  const groupsResponse = await getGroups();

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Haegeprekerke bewerken</ArticleTitle>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <ul>
          {groupsResponse.map((group) => (
            <li key={group.abbr}>
              <Link
                href={{
                  pathname: `/haegeprekerke/editor/${group.abbr}`
                }}
              >
                {group.name}
              </Link>
            </li>
          ))}
        </ul>
      </ArticleContent>
    </Article>
  );
};

export default Page;
