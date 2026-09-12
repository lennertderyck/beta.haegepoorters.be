import Icon from "@/components/basics/Icon/Icon";
import { cn } from "@/lib/utils/composers";
import { FC } from "react";
import { RootNavigationItemProps } from "./RootNavigation.types";
import RootNavigationMenuLink from "./RootNavigationMenuLink";
import RootNavigationMenuLinkContent from "./RootNavigationMenuLinkContent";

interface Props {
  items: RootNavigationItemProps[];
}

const RootNavigationMenu: FC<Props> = ({ items }) => {
  return (
    <>
      <ul className="*:p-5 *:border-b-2 *:border-gray-200">
        {items.map((item) => (
          <RootNavigationMenuLink
            key={item.href}
            href={item.href}
            className="flex items-center"
          >
            <Icon name={item.icon} size="1.5rem" className="shrink-0" />
            <RootNavigationMenuLinkContent>
              <span
                className={cn(
                  "transition-all origin-left",
                  "font-semibold whitespace-nowrap pl-5"
                )}
              >
                {item.name}
              </span>
              <Icon
                name="arrow-right-line"
                size="1.2rem"
                className="shrink-0"
              />
            </RootNavigationMenuLinkContent>
          </RootNavigationMenuLink>
        ))}
      </ul>
    </>
  );
};

export default RootNavigationMenu;
