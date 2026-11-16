import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC } from "react";
import RootNavigationDynamicVisible from "./RootNavigationMenuHiddenItem";

const RootNavigationMenuLinkContent: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <RootNavigationDynamicVisible
      className={cn(
        className,
        "flex-1 flex items-center justify-between gap-5"
      )}
      {...otherProps}
    />
  );
};

export default RootNavigationMenuLinkContent;
