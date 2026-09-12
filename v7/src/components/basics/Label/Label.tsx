import { cva } from "class-variance-authority";
import { ComponentProps, FC } from "react";

export const labelVariants = cva(
  "text-xs font-semibold uppercase tracking-widest"
);

const Label: FC<ComponentProps<"span">> = ({ className, ...otherProps }) => {
  return <span className={labelVariants({ className })} {...otherProps}></span>;
};

export default Label;
