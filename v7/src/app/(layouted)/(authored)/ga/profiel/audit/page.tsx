import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContent,
    ArticleSupertitle,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Label from "@/components/basics/Label/Label";
import { requireCapability } from "@/lib/auth/guards";
import { AuthLoginProvider, createAuth } from "@/lib/modules/Auth";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";

const LOGIN_PROVIDER_LABELS: Record<NonNullable<AuthLoginProvider>, string> = {
  supabase: "Lokaal beheer",
  keycloak: "Groepsadministratie",
  other: "Onbekende context"
};

const AuditRow: FC<{ label: string; children: ReactNode }> = ({
  label,
  children
}) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:gap-8 py-3 border-b border-current/10">
    <dt className="sm:w-56 shrink-0">
      <Label>{label}</Label>
    </dt>
    <dd className="break-all">{children}</dd>
  </div>
);

const Page: FC = async () => {
  await requireCapability();
  const auth = await createAuth();

  const user = auth.session?.user;
  const memberId = await auth.memberId;
  const capabilities = auth.capabilities;

  return (
    <Article>
      <ArticleHeaderContent>
        <ArticleHeader>
          <ArticleSupertitle>Profiel</ArticleSupertitle>
          <ArticleTitle>Audit</ArticleTitle>
          <ArticleDescription>
            Toont de informatie we hebben over je account
          </ArticleDescription>
        </ArticleHeader>
      </ArticleHeaderContent>
      <ArticleContent>
        <dl>
          <AuditRow label="Naam">{user?.name || "—"}</AuditRow>
          <AuditRow label="Lidnummer">
            <code>{memberId ?? "Ophalen is mislukt"}</code>
          </AuditRow>
          <AuditRow label="Capabilities">
            {capabilities.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="px-2 py-0.5 rounded-full border border-current/30 text-sm"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
            ) : (
              "Geen"
            )}
          </AuditRow>
          <AuditRow label="E-mail">{user?.email || "—"}</AuditRow>
          <AuditRow label="Aangemeld via">
            {auth.provider ? LOGIN_PROVIDER_LABELS[auth.provider] : "—"}
          </AuditRow>
          <AuditRow label="Gebruikers-id website">
            <code>{user?.id ?? "Ophalen is mislukt"}</code>
          </AuditRow>
          <AuditRow label="Sessie geldig tot">
            {auth.session
              ? dayjs(auth.session.session.expiresAt).format("DD/MM/YYYY HH:mm")
              : "—"}
          </AuditRow>
        </dl>
      </ArticleContent>
    </Article>
  );
};

export default Page;
