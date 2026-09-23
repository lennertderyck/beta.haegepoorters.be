import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";

export const Flyover: FC<ComponentProps<"div"> & { asChild?: true }> = ({
  asChild,
  className,
  ...otherProps
}) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="flyover"
      className={cn("grid", className)}
      {...otherProps}
    />
  );
};

export const FlyoverFoundation: FC<
  ComponentProps<"div"> & { asChild?: true }
> = ({ asChild, className, ...otherProps }) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="foundation"
      className={cn("col-start-1 row-start-1 z-0", className)}
      {...otherProps}
    />
  );
};

export const FlyoverLane: FC<ComponentProps<"div"> & { asChild?: true }> = ({
  asChild,
  className,
  ...otherProps
}) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="lane"
      className={cn("col-start-1 row-start-1 z-10", className)}
      {...otherProps}
    />
  );
};
