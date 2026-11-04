import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Notice from "@/components/basics/Notice/Notice";
import MembershipCard from "@/components/ui/MembershipCard/MembershipCard";
import { getProfileQuery } from "@/lib/actions/queries/person";
import Feature from "@/lib/modules/Feature/Feature";
import { compileGroepsadministratieMemberStatusFromProfile } from "@/lib/vendors/sgv";
import dayjs from "dayjs";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = async () => {
  const isMembershipCardFeatureEnabled = await Feature.get("membership-card");

  const profileQueryResponse = isMembershipCardFeatureEnabled
    ? await getProfileQuery()
    : null;
  const isProfileQueryOk =
    isMembershipCardFeatureEnabled && profileQueryResponse?.ok;

  const profileData = isProfileQueryOk
    ? await profileQueryResponse.json()
    : null;
  const memberStatus = profileData
    ? compileGroepsadministratieMemberStatusFromProfile(profileData)
    : null;
  const firstJoined = memberStatus ? memberStatus.firstJoined : null;
  const activeUntil = dayjs(memberStatus?.lastActiveDate);
  const membershipNumber = profileData
    ? profileData.verbondsgegevens.lidnummer
    : null;
  const name = profileData
    ? `${profileData.vgagegevens.voornaam} ${profileData.vgagegevens.achternaam}`
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
        {!isProfileQueryOk && (
          <Notice>
            Er ging iets mis bij het ophalen van je lidkaart, probeer het later
            opnieuw.
          </Notice>
        )}
        {isMembershipCardFeatureEnabled && (
          <div>
            <MembershipCard
              memberName={name || ""}
              memberIdentification={membershipNumber}
              firstJoinedDate={firstJoined}
              activeUntilDate={activeUntil.toDate()}
              activeFunctions={memberStatus?.activeFunctions || []}
            />
          </div>
        )}
      </ArticleContent>
    </Article>
  );
};

export default Page;
