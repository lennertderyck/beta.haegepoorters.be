import Article, {
    ArticleContent,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import ActivityForm from "@/components/ui/ActivityForm/ActivityForm";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = () => {
  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Activiteit toevoegen</ArticleTitle>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <ActivityForm />
      </ArticleContent>
    </Article>
  );
};

export default Page;
