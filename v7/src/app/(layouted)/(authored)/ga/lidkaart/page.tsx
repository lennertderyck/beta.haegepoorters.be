import Article, {
  ArticleContent,
  ArticleDescription,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleTitle,
} from "@/components/basics/Article/Article";
import Notice from "@/components/basics/Notice/Notice";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = () => {
  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Lidkaart</ArticleTitle>
          <ArticleDescription>
            Gebruik je lidnummer om aan te melden bij de Groepsadministratie
          </ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <Notice>Hier kan je binnenkort je lidkaart vinden.</Notice>
      </ArticleContent>
    </Article>
  );
};

export default Page;
