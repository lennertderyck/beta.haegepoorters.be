import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC } from "react";

const Notice: FC<ComponentProps<"div">> = ({ className, ...otherProps }) => {
  return (
    <div className={cn("p-4 bg-neutral-100", className)} {...otherProps} />
  );
};

export default Notice;
