import Article, {
  ArticleContent,
  ArticleDescription,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleTitle,
} from "@/components/basics/Article/Article";
import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import Link from "next/link";
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
      <ArticleContent>
        <Button asChild variant="secondary">
          <Link href="/backoffice/passkeys">
            Passkeys beheren
            <Icon name="arrow-right-line" />
          </Link>
        </Button>
      </ArticleContent>
    </Article>
  );
};

export default Page;
