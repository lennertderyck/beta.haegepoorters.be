import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<"div"> {
  asChild?: boolean;
}

const RootNavigationFoundation: FC<Props> = ({
  className,
  asChild,
  ...otherProps
}) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        className,
        "before:block",
        "md:before:w-(--rootnavigation-size-min) h-full"
      )}
      {...otherProps}
    />
  );
};

export default RootNavigationFoundation;
