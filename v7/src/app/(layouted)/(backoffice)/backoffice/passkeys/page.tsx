import Article, {
  ArticleContent,
  ArticleDescription,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleTitle,
} from "@/components/basics/Article/Article";
import Notice from "@/components/basics/Notice/Notice";
import { getSupabaseClientConfig } from "@/lib/vendors/supabase/client";
import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import dayjs from "dayjs";
import { FC } from "react";
import DeletePasskeyButton from "./DeletePasskeyButton";
import RegisterPasskeyButton from "./RegisterPasskeyButton";

const formatDate = (date?: string) =>
  date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "nooit";

const Page: FC<PageProps<"/backoffice/passkeys">> = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Article>
        <ArticleHeader>
          <ArticleHeaderContainer>
            <ArticleTitle>Passkeys</ArticleTitle>
          </ArticleHeaderContainer>
        </ArticleHeader>
        <ArticleContent>
          <Notice>
            Passkeys zijn enkel beschikbaar voor webmasteraccounts. Meld je aan
            via &quot;Aanmelden als webmaster&quot; om een passkey toe te
            voegen.
          </Notice>
        </ArticleContent>
      </Article>
    );
  }

  const { data: passkeys, error } = await supabase.auth.passkey.list();

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Passkeys</ArticleTitle>
          <ArticleDescription>
            Meld je als {user.email} aan zonder wachtwoord.
          </ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent className="flex flex-col gap-8">
        {error && <Notice>{error.message}</Notice>}
        {passkeys && passkeys.length === 0 && (
          <Notice>Je hebt nog geen passkeys toegevoegd.</Notice>
        )}
        {passkeys && passkeys.length > 0 && (
          <ul className="flex flex-col divide-y divide-neutral-100">
            {passkeys.map((passkey) => (
              <li
                key={passkey.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="font-bold">
                    {passkey.friendly_name || "Passkey"}
                  </p>
                  <p className="text-sm">
                    Toegevoegd op {formatDate(passkey.created_at)} · Laatst
                    gebruikt {formatDate(passkey.last_used_at)}
                  </p>
                </div>
                <DeletePasskeyButton passkeyId={passkey.id} />
              </li>
            ))}
          </ul>
        )}
        <RegisterPasskeyButton supabaseConfig={getSupabaseClientConfig()} />
      </ArticleContent>
    </Article>
  );
};

export default Page;
