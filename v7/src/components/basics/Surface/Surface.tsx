import { cva } from "class-variance-authority";
import { ComponentProps, FC } from "react";

const surfaceVariants = cva(
  "shadow-lg p-12 border-2 border-neutral-100 rounded-xl"
);

/** Floating surface component. */
const Surface: FC<ComponentProps<"div">> = ({ className, ...otherProps }) => {
  return <div className={surfaceVariants({ className })} {...otherProps} />;
};

export default Surface;
