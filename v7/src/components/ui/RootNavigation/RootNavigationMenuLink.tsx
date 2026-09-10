"use client";

import { cn } from "@/lib/utils/composers";
import { isPartialStringValueMatch } from "@/lib/utils/validators";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<typeof Link> {}

const RootNavigationMenuLink: FC<Props> = ({ className, ...otherProps }) => {
  const pathname = usePathname();

  const isActive = isPartialStringValueMatch(
    pathname,
    otherProps.href?.toString() ?? ""
  );

  return (
    <Link
      className={cn(className, {
        "bg-primary-200": isActive,
        "text-primary-500": isActive
      })}
      {...otherProps}
    />
  );
};

export default RootNavigationMenuLink;
