import Timeline, {
    TimelineItem,
    TimelineItemContent,
    TimelineItemDescription,
    TimelineItemTime,
    TimelineItemTitle,
    TimelineProps
} from "@/components/elements/Timeline/ActivityTimeline";
import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import { Activity } from "@/lib/server/queries/activities";
import { composeActivityTitle } from "@/lib/utils/composers";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";

interface ActivitiesTimelineItemProps {
  activity: Activity;
}

export const ActivitiesTimelineItem: FC<ActivitiesTimelineItemProps> = ({
  activity
}) => {
  const meta = ACTIVITY_TYPES.find((type) => type.name === activity.type);
  const isMultiday = meta?.isMultiDay || false;

  return (
    <TimelineItem
      key={activity._id}
      state={dayjs(activity.startDate).isAfter(dayjs()) ? "future" : "past"}
    >
      <TimelineItemContent>
        <TimelineItemTime dateTime={activity.startDate}>
          {dayjs(activity.startDate).format("DD MMMM YYYY")}
          {isMultiday && (
            <> tot {dayjs(activity.endDate).format("DD MMMM YYYY")}</>
          )}
        </TimelineItemTime>
        <TimelineItemTitle>{composeActivityTitle(activity)}</TimelineItemTitle>
        <TimelineItemDescription>{activity.body}</TimelineItemDescription>
      </TimelineItemContent>
    </TimelineItem>
  );
};

interface Props extends TimelineProps {
  children: ReactNode;
}

const ActivitiesTimeline: FC<Props> = ({ children, ...otherProps }) => {
  return <Timeline {...otherProps}>{children}</Timeline>;
};

export default ActivitiesTimeline;
