import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, FC } from "react";
import { labelVariants } from "../Label/Label";

const buttonVariants = cva(
  [
    labelVariants(),
    "whitespace-nowrap w-fit text-primary-500 flex gap-2 items-center"
  ],
  {
    variants: {
      variant: {
        primary: "pl-2 pr-3 py-2 bg-primary-200",
        secondary: "border-b-2 border-primary-500 pb-1",
        tertiary: ""
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

interface Props
  extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button: FC<Props> = ({ asChild, variant, className, ...otherProps }) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={buttonVariants({ variant, className })}
      {...otherProps}
    />
  );
};

export default Button;
