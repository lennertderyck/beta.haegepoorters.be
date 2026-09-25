import { cn } from "@/lib/utils/composers";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";

/**
 * Field component for wrapping form fields.
 */
const Field: FC<ComponentProps<"label"> & { asChild?: boolean }> = ({
  asChild,
  className,
  ...otherProps
}) => {
  const Component = asChild ? Slot : "label";

  return (
    <Component
      role="group"
      data-slot="field"
      className={cn(className)}
      {...otherProps}
    />
  );
};

/**
 * FieldLabel component for labeling fields within a form.
 */
export const FieldLabel: FC<ComponentProps<"h4"> & { asChild?: boolean }> = ({
  asChild,
  className,
  ...otherProps
}) => {
  const Component = asChild ? Slot : "h4";

  return (
    <Component
      data-slot="field-label"
      className={cn("mb-2", className)}
      {...otherProps}
    />
  );
};

export default Field;
