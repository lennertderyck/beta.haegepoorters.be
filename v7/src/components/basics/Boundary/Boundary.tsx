import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC, Fragment, FragmentProps } from "react";

/**
 * A boundary for pages and layouts. It will house the main content of the page.
 *
 * Don't combine with secondary boundaries to prevent layout conflicts.
 */
const Boundary: FC<FragmentProps & { asChild?: boolean }> = ({
  asChild,
  children
}) => {
  const Component = asChild ? Slot : Fragment;

  return <Component>{children}</Component>;
};

/**
 * The main content area within a boundary. It is typically used to wrap the primary content of a page.
 * Adds block-level spacing to the main content area.
 */
export const BoundaryBlock: FC<ComponentProps<"main">> = ({
  className,
  ...otherProps
}) => {
  return <main className={cn("py-12 lg:py-24", className)} {...otherProps} />;
};

/**
 * A piece of content within the main content area of a boundary.
 * You can use one or more boundary content components within a boundary container.
 * Adds inline-level spacing and centers the content within the boundary.
 */
export const BoundaryInline: FC<
  ComponentProps<"div"> & { asChild?: boolean }
> = ({ asChild, className, ...otherProps }) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cn("px-6 mx-auto w-full max-w-390", className)}
      {...otherProps}
    />
  );
};

export default Boundary;
