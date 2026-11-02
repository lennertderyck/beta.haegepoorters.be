import Article, {
  ArticleContent,
  ArticleDescription,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleTitle,
} from "@/components/basics/Article/Article";
import Notice from "@/components/basics/Notice/Notice";
import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { FC } from "react";
import InviteForm from "./InviteForm";

const Page: FC<PageProps<"/backoffice/invites">> = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Uitnodigingen</ArticleTitle>
          <ArticleDescription>
            Maak een link aan waarmee iemand zich één keer kan aanmelden.
          </ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent className="flex flex-col gap-8">
        {user ? (
          <>
            <Notice>
              De link meldt aan als webmaster@haegepoorters.be, kan maar één
              keer gebruikt worden en verloopt na korte tijd.
            </Notice>
            <InviteForm />
          </>
        ) : (
          <Notice>
            Uitnodigingen zijn enkel beschikbaar voor webmasteraccounts. Meld je
            aan via &quot;Aanmelden als webmaster&quot;.
          </Notice>
        )}
      </ArticleContent>
    </Article>
  );
};

export default Page;
