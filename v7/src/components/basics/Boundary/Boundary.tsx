import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC, FragmentProps } from "react";

/**
 * A boundary for pages and layouts. It will house the main content of the page.
 *
 * Don't combine with secondary boundaries to prevent layout conflicts.
 */
const Boundary: FC<FragmentProps> = ({ children }) => {
  return <>{children}</>;
};

/**
 * The main content area within a boundary. It is typically used to wrap the primary content of a page.
 */
export const BoundaryContainer: FC<ComponentProps<"main">> = ({
  className,
  ...otherProps
}) => {
  return <main className={cn("py-12 lg:py-24", className)} {...otherProps} />;
};

/**
 * A piece of content within the main content area of a boundary.
 * You can use one or more boundary content components within a boundary container.
 */
export const BoundaryContent: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <div
      className={cn("px-6 mx-auto w-full max-w-390", className)}
      {...otherProps}
    />
  );
};

export default Boundary;
