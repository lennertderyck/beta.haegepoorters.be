import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";

export interface TimelineProps extends ComponentProps<"ul"> {}

const Timeline: FC<TimelineProps> = ({ ...otherProps }) => {
  return <ul data-slot="timeline" {...otherProps}></ul>;
};

const TimelineItem: FC<
  ComponentProps<"li"> & { state?: "current" | "future" | "past" }
> = ({ state, className, ...otherProps }) => {
  return (
    <TimelineItemInset asChild>
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
    </TimelineItemInset>
  );
};

/**
 * TimelineItemInset component for wrapping timeline items with optional asChild prop.
 * Already used in the TimelineItem component.
 */
const TimelineItemInset: FC<ComponentProps<"div"> & { asChild?: boolean }> = ({
  asChild,
  className,
  ...otherProps
}) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      data-slot="timeline-item-inset"
      className={cn("pl-8", className)}
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
    TimelineItemInset,
    TimelineItemTime,
    TimelineItemTitle
};
export default Timeline;
