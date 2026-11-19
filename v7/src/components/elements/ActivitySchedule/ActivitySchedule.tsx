import { cn } from "@/lib/utils/composers";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import { ComponentProps, FC } from "react";

const activityScheduleVariants = cva(
  "flex items-start bg-neutral-50 border-b border-neutral-200",
  {
    variants: {
      density: {
        default: "px-7 gap-6",
        compact: "px-4 gap-4"
      }
    },
    defaultVariants: {
      density: "default"
    }
  }
);

const ActivitySchedule: FC<
  ComponentProps<"div"> & VariantProps<typeof activityScheduleVariants>
> = ({ className, density, ...props }) => {
  return (
    <div
      data-slot="activity-schedule"
      data-density={density}
      className={activityScheduleVariants({ className, density })}
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
        "font-serif font-black text-center *:block text-neutral-400 ",
        "py-6 translate-y-1",
        "in-data-[density=compact]:py-4 in-data-[density=compact]:translate-y-0",
        className
      )}
      {...props}
    >
      <span className="text-3xl leading-5">{date.format("DD")}</span>
      <span className="text-xl leading-5">{date.format("MMM")}</span>
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
      className={cn(
        "w-full",
        "py-3",
        "in-data-[density=compact]:py-1",
        className
      )}
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
      className={cn("py-3", className)}
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
      className={cn("font-semibold text-xl text-neutral-500", className)}
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
        "text-xs font-semibold tracking-widest uppercase text-neutral-500",
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
