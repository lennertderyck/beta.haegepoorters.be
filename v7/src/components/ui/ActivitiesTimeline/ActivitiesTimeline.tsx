import Timeline, {
    TimelineItem,
    TimelineItemContent,
    TimelineItemDescription,
    TimelineItemTime,
    TimelineItemTitle,
    TimelineProps
} from "@/components/elements/Timeline/ActivityTimeline";
import { Activity } from "@/lib/actions/queries/activities";
import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";

export const ActivitiesTimelineItem: FC<{ activity: Activity }> = ({
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
        <TimelineItemTitle>{activity.title}</TimelineItemTitle>
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
