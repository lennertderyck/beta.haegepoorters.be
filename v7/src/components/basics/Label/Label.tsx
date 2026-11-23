import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, FC } from "react";

export const labelVariants = cva("", {
  variants: {
    density: {
      small: "text-xs font-semibold uppercase tracking-widest",
      medium: "text-sm font-semibold uppercase tracking-widest"
    }
  },
  defaultVariants: {
    density: "small"
  }
});

const Label: FC<
  ComponentProps<"span"> & { asChild?: boolean } & VariantProps<
      typeof labelVariants
    >
> = ({ className, asChild, density, ...otherProps }) => {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={labelVariants({ className, density })}
      {...otherProps}
    ></Comp>
  );
};

export default Label;
