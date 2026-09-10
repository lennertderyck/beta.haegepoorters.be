import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Timeline, {
    TimelineItem,
    TimelineItemContent,
    TimelineItemDescription,
    TimelineItemTime,
    TimelineItemTitle
} from "@/components/elements/Timeline/ActivityTimeline";
import GroupSelectionMenu from "@/components/ui/GroupSelectionMenu/GroupSelectionMenu";
import { getActivitiesForDateRangeAndGroupByAbbr } from "@/lib/actions/queries/activities";
import { getGroups } from "@/lib/actions/queries/groups";
import dayjs from "dayjs";
import { FC } from "react";

const DEFAULT_SELECTED_GROUP = "kap";
const DEFAULT_MONTHS_RANGE = 3;

interface Props {}

const Page: FC<PageProps<"/haegeprekerke/[[...group]]">> = async ({
  params,
  searchParams
}) => {
  const { group: groupParam } = await params;
  const { van, tot, activiteit } = await searchParams;

  const selectedGroup = groupParam ? groupParam[0] : DEFAULT_SELECTED_GROUP;

  const rangeStart = (van ? dayjs(String(van), "DD-MM-YYYY") : dayjs()).startOf(
      "month"
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
          <ArticleTitle>Haegeprekerke</ArticleTitle>
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
          <p>Geen activiteiten gevonden voor deze groep en deze periode.</p>
        )}
        {activitiesForGroup && (
          <Timeline>
            {activitiesForGroup?.map((activity) => (
              <TimelineItem
                key={activity._id}
                state={
                  dayjs(activity.startDate).isAfter(dayjs()) ? "future" : "past"
                }
              >
                <TimelineItemContent>
                  <TimelineItemTime dateTime={activity.startDate}>
                    {dayjs(activity.startDate).format("DD MMMM YYYY")}
                  </TimelineItemTime>
                  <TimelineItemTitle>{activity.title}</TimelineItemTitle>
                  <TimelineItemDescription>
                    {activity.body}
                  </TimelineItemDescription>
                </TimelineItemContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </ArticleContent>
    </Article>
  );
};

export default Page;
