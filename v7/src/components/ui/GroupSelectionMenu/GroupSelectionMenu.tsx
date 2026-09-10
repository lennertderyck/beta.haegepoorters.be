import Button from "@/components/basics/Button/Button";
import { getGroups } from "@/lib/actions/queries/groups";
import { cn } from "@/lib/utils/composers";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<"ul"> {
  selectedGroupAbbr: string;
  href: (group: { abbr: string }) => Url;
}

const GroupSelectionMenu: FC<Props> = async ({
  className,
  selectedGroupAbbr,
  href,
  ...otherProps
}) => {
  const groupsResponse = await getGroups();

  return (
    <ul className={cn("flex gap-4", className)} {...otherProps}>
      {groupsResponse.map((group) => (
        <li key={group._id}>
          <Button
            asChild
            variant={
              selectedGroupAbbr === group.abbr ? "secondary" : "tertiary"
            }
          >
            <Link
              className={cn({
                "font-bold": selectedGroupAbbr === group.abbr
              })}
              href={href(group)}
            >
              {group.name}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default GroupSelectionMenu;
