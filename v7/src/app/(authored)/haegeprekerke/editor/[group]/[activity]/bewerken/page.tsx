import Article, {
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
          <ArticleTitle>Activiteit bewerken</ArticleTitle>
        </ArticleHeaderContainer>
      </ArticleHeader>
    </Article>
  );
};

export default Page;
