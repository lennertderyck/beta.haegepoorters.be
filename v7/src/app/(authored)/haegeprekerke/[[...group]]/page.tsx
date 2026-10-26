import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import Notice from "@/components/basics/Notice/Notice";
import ActivitiesTimeline, {
    ActivitiesTimelineItem
} from "@/components/ui/ActivitiesTimeline/ActivitiesTimeline";
import GroupSelectionMenu from "@/components/ui/GroupSelectionMenu/GroupSelectionMenu";
import { getActivitiesForDateRangeAndGroupByAbbr } from "@/lib/actions/queries/activities";
import { getGroupByAbbr, getGroups } from "@/lib/actions/queries/groups";
import { DEFAULT_SELECTED_ACTIVITIES_GROUP } from "@/lib/constants/constants";
import { createAuth } from "@/lib/modules/Auth";
import dayjs, { OpUnitType } from "dayjs";
import type { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

const DEFAULT_SELECTED_GROUP = DEFAULT_SELECTED_ACTIVITIES_GROUP;
const DEFAULT_MONTHS_RANGE = 3;

const START_RANGE_OF: OpUnitType = "week";

export const generateMetadata = async ({
  params
}: PageProps<"/haegeprekerke/[[...group]]">): Promise<Metadata> => {
  const { group: groupParam } = await params;
  const groupAbbr = groupParam?.[0];
  const group = groupAbbr
    ? await getGroupByAbbr(groupAbbr).catch(() => null)
    : null;

  return {
    title: group ? `Haegeprekerke ${group.name}` : "Haegeprekerke",
    description: group
      ? `Bekijk de aankomende activiteiten van de ${group.name} bij Scouts & Gidsen Haegepoorters Destelbergen.`
      : "Bekijk de aankomende activiteiten van alle takken bij Scouts & Gidsen Haegepoorters Destelbergen.",
    alternates: {
      canonical: groupAbbr ? `/haegeprekerke/${groupAbbr}` : "/haegeprekerke"
    }
  };
};

const Page: FC<PageProps<"/haegeprekerke/[[...group]]">> = async ({
  params,
  searchParams
}) => {
  const auth = await createAuth();

  const isAuthenticated = auth.isAuthenticated;
  const hasCapabilities =
    isAuthenticated &&
    (auth.capabilities.includes("leader") ||
      auth.capabilities.includes("webmaster"));

  const { group: groupParam } = await params;
  const { van, tot, activiteit } = await searchParams;

  const selectedGroup = groupParam ? groupParam[0] : DEFAULT_SELECTED_GROUP;

  const rangeStart = (van ? dayjs(String(van), "DD-MM-YYYY") : dayjs()).startOf(
      START_RANGE_OF
    ),
    rangeEnd = tot
      ? dayjs(String(tot), "DD-MM-YYYY").endOf("month")
      : rangeStart.add(DEFAULT_MONTHS_RANGE - 1, "month").endOf("month");

  const groupsResponse = await getGroups();
  const activitiesResponse = selectedGroup
    ? await getActivitiesForDateRangeAndGroupByAbbr(
        {
          start: rangeStart.toDate(),
          end: rangeEnd.toDate()
        },
        String(selectedGroup)
      )
    : null;

  const activitiesForGroup = activitiesResponse?.activities ?? null;

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <div className="flex items-center justify-between">
            <ArticleTitle>Haegeprekerke</ArticleTitle>
            {hasCapabilities && (
              <div>
                <Button variant="tertiary" asChild>
                  <Link href={`/haegeprekerke/editor/${selectedGroup}`}>
                    Editor openen <Icon name="arrow-right-line" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
          <ArticleDescription>
            Activiteiten van {rangeStart.format("D MMMM YYYY")} tot{" "}
            {rangeEnd.format("D MMMM YYYY")}
          </ArticleDescription>
          <GroupSelectionMenu
            className="mt-8"
            selectedGroupAbbr={selectedGroup}
            href={({ abbr }) => ({
              pathname: "/haegeprekerke/" + abbr,
              query: {
                van: rangeStart.format("DD-MM-YYYY"),
                tot: rangeEnd.format("DD-MM-YYYY")
              }
            })}
          />
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        {activitiesForGroup?.length === 0 && (
          <Notice>
            Geen activiteiten gevonden voor deze groep en deze periode.
          </Notice>
        )}
        {activitiesForGroup && activitiesForGroup?.length > 0 && (
          <>
            <ActivitiesTimeline>
              {activitiesForGroup.map((activity) => (
                <ActivitiesTimelineItem
                  key={activity._id}
                  activity={activity}
                />
              ))}
            </ActivitiesTimeline>
          </>
        )}
      </ArticleContent>
    </Article>
  );
};

export default Page;
