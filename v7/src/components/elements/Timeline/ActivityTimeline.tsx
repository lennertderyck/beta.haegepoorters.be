import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC } from "react";

const Timeline: FC<ComponentProps<"ul">> = ({ ...otherProps }) => {
  return <ul data-slot="timeline" {...otherProps}></ul>;
};

const TimelineItem: FC<
  ComponentProps<"li"> & { state?: "current" | "future" | "past" }
> = ({ state, className, ...otherProps }) => {
  return (
    <li
      data-slot="timeline-item"
      data-state={state}
      className={cn(
        "relative",
        "border-l-2 border-primary-500",
        "pb-4 pl-8",
        "before:absolute before:top-0 before:size-3 before:rounded-full before:-left-1.75 before:bg-primary-500",
        "opacity-100 data-[state=past]:opacity-50",
        className
      )}
      {...otherProps}
    />
  );
};

const TimelineItemContent: FC<ComponentProps<"article">> = ({
  className,
  ...otherProps
}) => {
  return (
    <article
      data-slot="timeline-item-content"
      className={cn("-translate-y-2", className)}
      {...otherProps}
    />
  );
};

const TimelineItemTime: FC<ComponentProps<"time">> = ({
  className,
  ...otherProps
}) => {
  return (
    <time
      data-slot="timeline-item-time"
      className={cn("block font-serif text-xl text-primary-500", className)}
      {...otherProps}
    />
  );
};

const TimelineItemTitle: FC<ComponentProps<"h3">> = ({
  className,
  ...otherProps
}) => {
  return (
    <h3
      data-slot="timeline-item-title"
      className={cn("text-lg font-semibold", className)}
      {...otherProps}
    />
  );
};

const TimelineItemDescription: FC<ComponentProps<"p">> = ({
  className,
  ...otherProps
}) => {
  return (
    <p
      data-slot="timeline-item-description"
      className={cn("text-sm leading-6 mt-4", className)}
      {...otherProps}
    />
  );
};

export {
    TimelineItem,
    TimelineItemContent,
    TimelineItemDescription,
    TimelineItemTime,
    TimelineItemTitle
};
export default Timeline;
