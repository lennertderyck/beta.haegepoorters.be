import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Notice from "@/components/basics/Notice/Notice";
import MembershipCard from "@/components/ui/MembershipCard/MembershipCard";
import Feature from "@/lib/modules/Feature/Feature";
import { getMembershipLocal } from "@/lib/server/actions/membership";
import { getPersonMembershipFromProfileQuery } from "@/lib/server/queries/person";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = async () => {
  const isMembershipCardFeatureEnabled = await Feature.get("membership-card");

  const membership = isMembershipCardFeatureEnabled
    ? (await getMembershipLocal()) ||
      (await getPersonMembershipFromProfileQuery().catch(() => null))
    : null;

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Lidkaart</ArticleTitle>
          <ArticleDescription>
            Gebruik je lidnummer om aan te melden bij de Groepsadministratie
          </ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        {!isMembershipCardFeatureEnabled && (
          <Notice>Hier kan je binnenkort je lidkaart vinden.</Notice>
        )}
        {isMembershipCardFeatureEnabled && (
          <>
            {!membership && (
              <Notice>
                Er ging iets mis bij het ophalen van je lidkaart, probeer het
                later opnieuw.
              </Notice>
            )}
            {membership && (
              <div>
                <MembershipCard
                  memberName={membership.memberName || ""}
                  memberIdentification={membership.memberIdentification || ""}
                  memberFunction={membership.memberFunction || ""}
                  firstJoined={membership.firstJoined}
                />
              </div>
            )}
          </>
        )}
      </ArticleContent>
    </Article>
  );
};

export default Page;
