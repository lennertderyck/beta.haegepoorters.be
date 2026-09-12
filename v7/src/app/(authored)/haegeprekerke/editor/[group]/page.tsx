import Article, {
  ArticleContent,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleTitle
} from "@/components/basics/Article/Article";
import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import Timeline, {
  TimelineItem,
  TimelineItemContent,
  TimelineItemDescription,
  TimelineItemTime,
  TimelineItemTitle
} from "@/components/elements/Timeline/ActivityTimeline";
import { getActivitiesForDateRangeAndGroupByAbbr } from "@/lib/actions/queries/activities";
import { getGroupByAbbr } from "@/lib/actions/queries/groups";
import { DEFAULT_SELECTED_ACTIVITIES_GROUP } from "@/lib/constants/constants";
import dayjs from "dayjs";
import Link from "next/link";
import { FC } from "react";

const MAX_PERIOD_MONTHS = 5;
const DEFAULT_SELECTED_GROUP = DEFAULT_SELECTED_ACTIVITIES_GROUP;

const Page: FC<PageProps<"/haegeprekerke/editor/[group]">> = async ({
  params,
  searchParams
}) => {
  const { group } = await params;
  const {
    referentie,
    /**
     * This is the truth, if reference falls outside range, we don't show it in the UI.
     */
    van,
    tot
  } = await searchParams;

  const selectedMonth = (
    referentie ? dayjs(String(referentie)) : dayjs()
  ).startOf("month");

  const isReferenceInRange = selectedMonth.isBetween(
    dayjs(String(van)).startOf("month"),
    dayjs(String(tot)).startOf("month"),
    "month",
    "[]"
  );

  const periodStartParameter = (van ? dayjs(String(van)) : dayjs()).startOf(
    "month"
  );

  const periodEndParameter = tot
    ? dayjs(String(tot)).endOf("month")
    : periodStartParameter.add(MAX_PERIOD_MONTHS - 1, "month").endOf("month");

  const periodMaxEnd = periodStartParameter
    .add(MAX_PERIOD_MONTHS - 1, "month")
    .endOf("month");

  const isPeriodEndParameterInRange = periodEndParameter.isBetween(
    periodStartParameter,
    periodMaxEnd,
    "month",
    "[]"
  );

  const periodStart = periodStartParameter;
  const periodEnd = isPeriodEndParameterInRange
    ? periodEndParameter
    : periodMaxEnd;

  const periodLength = periodEnd.diff(periodStart, "month") + 1;

  const monthList = Array.from({ length: periodLength }, (_, i) =>
    periodStartParameter.add(i, "month")
  );

  const groupResponse = await getGroupByAbbr(group);
  const activitiesResponse = await getActivitiesForDateRangeAndGroupByAbbr(
    {
      start: selectedMonth.startOf("month").toDate(),
      end: selectedMonth.endOf("month").toDate()
    },
    group
  );

  const activitiesForGroup = activitiesResponse?.activities ?? null;

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <div className="flex flex-row flex-wrap justify-between items-center gap-4">
            <ArticleTitle>{groupResponse.name}</ArticleTitle>
            <Button variant="primary" asChild>
              <Link
                href={{
                  pathname: `/haegeprekerke/editor/${group}/toevoegen`,
                  query: {
                    van: periodStartParameter.format("YYYY-MM-DD"),
                    tot: periodEndParameter.format("YYYY-MM-DD")
                  }
                }}
              >
                Activiteit toevoegen
                <Icon name="add-line" size="1rem" />
              </Link>
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-3 mt-8 lg:mt-6">
            {monthList.map((month) => (
              <li key={month.toString()}>
                <Button
                  asChild
                  variant={
                    selectedMonth.isSame(month, "month")
                      ? "secondary"
                      : "tertiary"
                  }
                >
                  <Link
                    href={{
                      pathname: `/haegeprekerke/editor/${group}`,
                      query: {
                        referentie: month.format("YYYY-MM-DD"),
                        van: periodStartParameter.format("YYYY-MM-DD"),
                        tot: periodEndParameter.format("YYYY-MM-DD")
                      }
                    }}
                  >
                    {month.format("MMMM 'YY")}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
          {!isReferenceInRange && (
            <p>De geselecteerde datum valt buiten het bereik.</p>
          )}
          {!isPeriodEndParameterInRange && (
            <p>
              Het geselecteerde einde van de periode valt buiten het bereik.
            </p>
          )}
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        {activitiesForGroup?.length === 0 && (
          <p>Geen activiteiten gevonden voor deze periode.</p>
        )}
        {activitiesForGroup && (
          <Timeline>
            {activitiesForGroup?.map((activity) => (
              <Link
                key={activity._id}
                href={{
                  pathname: `/haegeprekerke/editor/${group}/${activity._id}/bewerken`
                }}
              >
                <TimelineItem
                  state={
                    dayjs(activity.startDate).isAfter(dayjs())
                      ? "future"
                      : "past"
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
                    <Button variant="tertiary" className="mt-4">
                      Bewerken
                      <Icon name="arrow-right-line" size="1rem" />
                    </Button>
                  </TimelineItemContent>
                </TimelineItem>
              </Link>
            ))}
          </Timeline>
        )}
      </ArticleContent>
    </Article>
  );
};

export default Page;
