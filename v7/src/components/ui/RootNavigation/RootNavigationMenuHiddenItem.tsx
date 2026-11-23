import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";

const RootNavigationDynamicVisible: FC<
  ComponentProps<"div"> & { asChild?: boolean }
> = ({ asChild, className, ...otherProps }) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "overflow-hidden",
        "transition-all origin-left",
        "w-75 md:group-data-[state=closed]:max-w-[0vw] md:group-data-[state=open]:max-w-[100vw]",
        "md:group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100 duration-(--rootnavigation-transition-time)",
        "duration-(--rootnavigation-transition-time)",
        className
      )}
      {...otherProps}
    />
  );
};

export default RootNavigationDynamicVisible;
