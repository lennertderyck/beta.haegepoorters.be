import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";
import { RootNavigationItemProps } from "./RootNavigation.types";
import RootNavigationFoundation from "./RootNavigationFoundation";
import RootNavigationMenu from "./RootNavigationMenu";

interface Props extends ComponentProps<"nav"> {
  asChild?: boolean;

  itemsStart: RootNavigationItemProps[];
  itemsEnd: RootNavigationItemProps[];
}

const RootNavigation: FC<Props> = ({
  itemsStart,
  itemsEnd,
  asChild,
  className,
  ...otherProps
}) => {
  const Comp = asChild ? Slot : "nav";

  return (
    <>
      <RootNavigationFoundation
        asChild
        data-state="open"
        className={cn(
          "group",
          "fixed top-0 left-0 bottom-0",
          "md:before:w-(--rootnavigation-size-min)",
          "overflow-hidden",
          "border-r-(length:--navigation-item-border-width) border-gray-200",
          "bg-white",
          "max-w-[90vw]",
          "transition-[width] duration-250"
        )}
      >
        <Comp
          className={cn("h-full text-gray-600", "", "", className)}
          {...otherProps}
        >
          <div className="size-(--rootnavigation-size-min) bg-primary-500"></div>
          <div className="flex flex-1 flex-col justify-between">
            <RootNavigationMenu items={itemsStart} />
            <RootNavigationMenu items={itemsEnd} />
          </div>
        </Comp>
      </RootNavigationFoundation>
    </>
  );
};

export default RootNavigation;
