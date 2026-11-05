import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, FC } from "react";

export const labelVariants = cva("", {
  variants: {
    sizing: {
      small: "text-xs font-semibold uppercase tracking-widest",
      medium: "text-sm font-semibold uppercase tracking-widest"
    }
  },
  defaultVariants: {
    sizing: "small"
  }
});

const Label: FC<
  ComponentProps<"span"> & { asChild?: boolean } & VariantProps<
      typeof labelVariants
    >
> = ({ className, asChild, sizing, ...otherProps }) => {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={labelVariants({ className, sizing })}
      {...otherProps}
    ></Comp>
  );
};

export default Label;
