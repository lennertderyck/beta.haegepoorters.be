import Icon from "@/components/basics/Icon/Icon";
import Label from "@/components/basics/Label/Label";
import { authMemory } from "@/lib/initializer";
import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";
import { SigninContext } from "../../../../packages/auth/AuthMemory";
import { RootNavigationItemProps } from "./RootNavigation.types";
import RootNavigationFoundation from "./RootNavigationFoundation";
import RootNavigationMenu from "./RootNavigationMenu";
import RootNavigationMenuLinkContent from "./RootNavigationMenuLinkContent";

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
  const session = authMemory.session;
  const name = session?.user?.name || "Onbekend";

  const signContextLabelMap: Record<NonNullable<SigninContext>, string> = {
    local: "Lokaal beheer"
  };

  const signContextLabel =
    signContextLabelMap[
      authMemory.signinContext as NonNullable<SigninContext>
    ] || "Groepsadministratie";

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
          "transition-[width] duration-350 ease-in-out"
        )}
      >
        <Comp className={cn("h-full text-gray-600", className)} {...otherProps}>
          <div className="flex">
            <div className="size-(--rootnavigation-size-min) bg-primary-500"></div>
            <RootNavigationMenuLinkContent className="flex-1">
              <div className="flex-1 flex items-center gap-5 px-5">
                <div className="flex-1 flex flex-col items-end *:leading-4">
                  <div className="font-serif text-lg">{signContextLabel}</div>
                  <Label>{name}</Label>
                </div>
                <Icon name="account-circle-line" size="1.5rem" />
              </div>
            </RootNavigationMenuLinkContent>
          </div>
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
