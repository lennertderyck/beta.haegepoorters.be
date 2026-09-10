import { cn } from "@/lib/utils/composers";
import dayjs from "dayjs";
import { ComponentProps, FC } from "react";

const ActivitySchedule: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="activity-schedule"
      className={cn(
        "flex items-start gap-6 bg-gray-50 py-4 px-7 border-b border-gray-200",
        className
      )}
      {...props}
    />
  );
};

const ActivityScheduleTime: FC<Omit<ComponentProps<"time">, "children">> = ({
  className,
  dateTime,
  ...props
}) => {
  const date = dayjs(dateTime).startOf("day");

  return (
    <time
      data-slot="activity-schedule-time"
      dateTime={date.format()}
      className={cn(
        "font-serif font-black text-center *:block text-gray-400 translate-y-2",
        className
      )}
      {...props}
    >
      <span className="text-3xl leading-4">{date.format("DD")}</span>
      <span className="text-xl leading-4">{date.format("MMM")}</span>
    </time>
  );
};

const ActivityScheduleList: FC<ComponentProps<"ul">> = ({
  className,
  ...props
}) => {
  return (
    <ul
      data-slot="activity-schedule-list"
      className={cn("text-gray-600 w-full", className)}
      {...props}
    />
  );
};

const ActivityScheduleItem: FC<ComponentProps<"li">> = ({
  className,
  ...props
}) => {
  return (
    <li
      data-slot="activity-schedule-item"
      className={cn("mb-4 last:mb-0", className)}
      {...props}
    />
  );
};

const ActivityScheduleItemTitle: FC<ComponentProps<"p">> = ({
  className,
  ...props
}) => {
  return (
    <p
      data-slot="activity-schedule-item-title"
      className={cn("font-semibold text-xl", className)}
      {...props}
    />
  );
};

const ActivityScheduleItemLabel: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <h5
      data-slot="activity-schedule-item-label"
      className={cn(
        "text-xs font-semibold tracking-widest uppercase",
        className
      )}
      {...props}
    />
  );
};

export default ActivitySchedule;
export {
    ActivityScheduleItem,
    ActivityScheduleItemLabel,
    ActivityScheduleItemTitle,
    ActivityScheduleList,
    ActivityScheduleTime
};
