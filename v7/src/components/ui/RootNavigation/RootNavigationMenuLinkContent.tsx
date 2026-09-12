import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC } from "react";

const RootNavigationMenuLinkContent: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <div
      className={cn(
        "flex-1 flex items-center justify-between gap-5",
        "overflow-hidden",
        "transition-all origin-left",
        "max-w-[0vw] group-hover:max-w-[100vw] w-[300px]",
        "opacity-0 group-hover:opacity-100 duration-(--rootnavigation-transition-time)",
        className
      )}
      {...otherProps}
    />
  );
};

export default RootNavigationMenuLinkContent;
