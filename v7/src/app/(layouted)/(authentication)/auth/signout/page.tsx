import Article, {
    ArticleHeader,
    ArticleHeaderContent,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Icon from "@/components/basics/Icon/Icon";
import { FC } from "react";
import SignoutClientProvider from "./SignoutClientProvider";

interface Props {}

const Page: FC<Props> = () => {
  return (
    <SignoutClientProvider asChild>
      <Article>
        <ArticleHeader>
          <ArticleHeaderContent>
            <Icon
              name="loader-2-line"
              className="animate-spin mx-auto text-center mb-4"
              size="2rem"
            />
            <ArticleTitle className="text-center">We melden je af</ArticleTitle>
          </ArticleHeaderContent>
        </ArticleHeader>
      </Article>
    </SignoutClientProvider>
  );
};

export default Page;
