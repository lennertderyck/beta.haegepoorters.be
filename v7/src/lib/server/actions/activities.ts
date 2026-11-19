import "server-only";

import { getGeneralGroupActivitiesForDateRangeQuery } from "../queries/activities";
import dayjs from "dayjs";

export const fetchGeneralGroupActivitiesForDateRange = async () => {
  const dateRangeStart = dayjs().startOf("month");
  const dateRangeEnd = dateRangeStart.add(3, "month").endOf("month");

  const range = {
    start: dateRangeStart.toISOString(),
    end: dateRangeEnd.toISOString()
  };

  return await getGeneralGroupActivitiesForDateRangeQuery(range);
};
