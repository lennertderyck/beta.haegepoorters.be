import Article, {
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Button from "@/components/basics/Button/Button";
import { getGroupByAbbr } from "@/lib/actions/queries/groups";
import dayjs from "dayjs";
import Link from "next/link";
import { FC } from "react";

const MAX_PERIOD_MONTHS = 5;

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

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>{groupResponse.name}</ArticleTitle>

          <ul className="flex gap-4">
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
    </Article>
  );
};

export default Page;
