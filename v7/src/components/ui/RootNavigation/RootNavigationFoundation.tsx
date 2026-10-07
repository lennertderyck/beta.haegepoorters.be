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

  return <></>;
};

export default RootNavigationFoundation;
