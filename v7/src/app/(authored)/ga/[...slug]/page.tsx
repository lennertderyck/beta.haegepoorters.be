import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Notice from "@/components/basics/Notice/Notice";
import { createAuth } from "@/lib/modules/Auth";
import { FC } from "react";
import { OAUTH_PROVIDERS } from "../../../../../auth.config";

interface Props {}

const Page: FC<Props> = async () => {
  const auth = await createAuth();

  const oauthProvider = OAUTH_PROVIDERS.find(
    (provider) => provider.config.providerId === auth.provider
  );

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Profiel</ArticleTitle>
          <ArticleDescription>
            {oauthProvider?.info.description}
          </ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <Notice>
          Hier kan je binnenkort je gegevens bij Scouts en Gidsen Vlaanderen
          beheren.
        </Notice>
      </ArticleContent>
    </Article>
  );
};

export default Page;
