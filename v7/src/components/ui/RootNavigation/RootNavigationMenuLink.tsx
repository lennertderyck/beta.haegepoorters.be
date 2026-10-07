"use client";

import { cn } from "@/lib/utils/composers";
import { isPartialStringValueMatch } from "@/lib/utils/validators";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<typeof Link> {
  exact?: boolean;
}

const RootNavigationMenuLink: FC<Props> = ({
  exact,
  className,
  ...otherProps
}) => {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === otherProps.href?.toString()
    : isPartialStringValueMatch(pathname, otherProps.href?.toString() ?? "");

  return (
    <Link
      className={cn(
        "md:group-data-[state=closed]:pointer-events-none cursor-pointer",
        className,
        {
          "bg-primary-200": isActive,
          "text-primary-500": isActive
        }
      )}
      {...otherProps}
    />
  );
};

export default RootNavigationMenuLink;
