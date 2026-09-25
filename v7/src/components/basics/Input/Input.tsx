import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";

const Input: FC<ComponentProps<"input"> & { asChild?: boolean }> = ({
  asChild,
  className,
  ...otherProps
}) => {
  const Component = asChild ? Slot : "input";

  return (
    <Component
      className={cn(
        "w-full",
        "px-2 py-1.5",
        "border border-neutral-100 focus-visible:border-neutral-200 ",
        "outline-none rounded-sm",
        "transition",
        className
      )}
      {...otherProps}
    />
  );
};

export default Input;
