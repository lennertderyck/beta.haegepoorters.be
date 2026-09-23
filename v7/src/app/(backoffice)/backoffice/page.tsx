import Article, {
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = () => {
  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Backoffice</ArticleTitle>
          <ArticleDescription>Beheer van de website.</ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
    </Article>
  );
};

export default Page;
