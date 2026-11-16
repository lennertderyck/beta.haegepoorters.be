import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContent,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Icon from "@/components/basics/Icon/Icon";
import Notice from "@/components/basics/Notice/Notice";
import { createAuth } from "@/lib/modules/Auth";
import { FC } from "react";
import { OAUTH_PROVIDERS } from "../../../../../../auth.config";
import SignoutButton from "./SignoutButton";

interface Props {}

const Page: FC<Props> = async () => {
  const auth = await createAuth();

  const oauthProvider = OAUTH_PROVIDERS.find(
    (provider) => provider.config.providerId === auth.provider
  );

  return (
    <Article>
      <ArticleHeaderContent>
        <ArticleHeader className="flex flex-wrap gap-8 justify-between">
          <div>
            <ArticleTitle>Profiel</ArticleTitle>
            <ArticleDescription>
              {oauthProvider?.info.description}
            </ArticleDescription>
          </div>
          <div className="mt-4">
            <SignoutButton>
              Afmelden <Icon name="arrow-right-long-line" />
            </SignoutButton>
          </div>
        </ArticleHeader>
      </ArticleHeaderContent>
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
