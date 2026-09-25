import Icon from "@/components/basics/Icon/Icon";
import { FOLLOW_LINKS } from "@/lib/constants/static";
import { cn } from "@/lib/utils/composers";
import Link from "next/link";
import { ComponentProps, FC } from "react";

const FooterSocialLinks: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-neutral-50 w-fit p-3 rounded-xl",
        className
      )}
      {...otherProps}
    >
      <p className="font-semibold">Volg ons op</p>
      <div className="flex gap-2">
        {FOLLOW_LINKS.map((link, linkIndex) => (
          <Link key={linkIndex} href={link.href}>
            <Icon name={link.icon} size="1.5rem" className="text-primary-500" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterSocialLinks;
