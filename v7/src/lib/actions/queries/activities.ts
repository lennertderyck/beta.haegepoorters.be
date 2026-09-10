import dayjs from "dayjs";
import { client } from "../../vendors/sanity/client";

export const getActivitiesForDateRangeAndGroupByAbbr = async (
  range: {
    start: dayjs.ConfigType;
    end: dayjs.ConfigType;
  },
  groupId: string
) => {
  return await client.fetch<{
    group: any;
    activities: any[];
    range: {
      startDate: string;
      endDate: string;
    };
  }>(
    `
      {
        "group": *[_type == "group" && abbr == $groupAbbr] | order(order asc)[0],
      } {
        ...,
        "activities": *[_type == "activity" && references(^.group._id) && startDate >= $startDate && startDate <= $endDate] | order(startDate asc),
        "range": {
          "startDate": $startDate,
          "endDate": $endDate,
        }
      }
    `,
    {
      startDate: range.start,
      endDate: range.end,
      groupAbbr: groupId
    }
  );
};

export const getActivitiesForDateRange = async (range: {
  start: dayjs.ConfigType;
  end: dayjs.ConfigType;
}) => {
  return await client.fetch(
    `
    {
      "timelineForGroups": *[_type == "group"] | order(order asc){
        "group": @,
        "results": *[_type == "activity" && references(^._id) && startDate >= $startDate && startDate <= $endDate] | order(startDate asc)
      },
      "range": {
        "startDate": $startDate,
        "endDate": $endDate,
      }
    }
  `,
    {
      startDate: dayjs(range.start).startOf("month"),
      endDate: dayjs(range.end).endOf("month")
    }
  );
};

export const getActivitiesPreviewForNextWeek = async () => {
  return await client.fetch<{
    activitiesByGroup: {
      group: any;
      activity: any;
    }[];
  }>(
    `
    { 
      "activitiesByGroup": *[_type == "group"] | order(order asc){
        "group": @,
        "activity": *[_type == "activity" && references(^._id) && startDate >= $startDate] | order(startDate asc)[0]
      }
    }
  `,
    {
      startDate: dayjs().startOf("week")
    }
  );
};

export const getActivitiesPreviewForNextWeekGroupedByDate = async () => {
  const response = await getActivitiesPreviewForNextWeek();

  return response.activitiesByGroup
    .filter((group) => !!group.activity)
    .reduce(
      (acc, { group, activity }) => {
        const activityDate = dayjs(activity?.startDate).format("YYYY-MM-DD");
        const existingGroupIndex = acc.findIndex(
          (group) => group.dateGroup === activityDate
        );

        return existingGroupIndex === -1
          ? [...acc, { dateGroup: activityDate, items: [{ group, activity }] }]
          : acc.map((dateGroup, dateGroupIndex) =>
              dateGroupIndex === existingGroupIndex
                ? {
                    ...dateGroup,
                    items: [...dateGroup.items, { group, activity }]
                  }
                : dateGroup
            );
      },
      [] as {
        dateGroup: string;
        items: {
          group: (typeof response.activitiesByGroup)[number]["group"];
          activity: (typeof response.activitiesByGroup)[number]["activity"];
        }[];
      }[]
    );
};
