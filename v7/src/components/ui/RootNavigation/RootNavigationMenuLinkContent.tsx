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
        "w-[300px] md:group-data-[state=closed]:max-w-[0vw] md:group-data-[state=open]:max-w-[100vw]",
        "md:group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100 duration-(--rootnavigation-transition-time)",
        className
      )}
      {...otherProps}
    />
  );
};

export default RootNavigationMenuLinkContent;
