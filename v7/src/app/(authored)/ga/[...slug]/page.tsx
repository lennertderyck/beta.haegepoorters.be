import Article, {
  ArticleContent,
  ArticleDescription,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleTitle,
} from "@/components/basics/Article/Article";
import Auth from "@/lib/modules/Auth";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = () => {
  const d = Auth.provider;

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Profiel</ArticleTitle>
          <ArticleDescription>Aangemeld bij {d}</ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent></ArticleContent>
    </Article>
  );
};

export default Page;
