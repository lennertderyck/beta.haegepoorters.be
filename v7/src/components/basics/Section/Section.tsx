import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";

export const Section: FC<ComponentProps<"section">> = (props) => {
  return <section {...props} />;
};

export const SectionHeader: FC<ComponentProps<"header">> = ({
  className,
  ...otherProps
}) => {
  return <header className={cn("mb-5", className)} {...otherProps} />;
};

export const SectionTitle: FC<ComponentProps<"h2"> & { asChild?: boolean }> = ({
  className,
  asChild,
  ...otherProps
}) => {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp
      className={cn("flex items-center gap-4 font-serif text-2xl text-gray-600", className)}
      {...otherProps}
    />
  );
};
