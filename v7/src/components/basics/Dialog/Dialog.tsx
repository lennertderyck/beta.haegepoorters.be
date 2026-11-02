import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC } from "react";

const Dialog: FC<ComponentProps<"dialog">> = (props) => {
  return <dialog {...props} />;
};

const DialogContent: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => {
  return (
    <div
      className={cn(
        "relative not-md:mt-auto md:max-w-lg h-fit md:max-h-3/6 bg-white p-8",
        className
      )}
      {...otherProps}
    />
  );
};

export default Dialog;
export { DialogContent };
