import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC } from "react";
import Icon from "../Icon/Icon";

/**
 * @example
 * <Option name="example-option" value="example-value">
 *   <OptionIcon name="example-icon" />
 *   <OptionLabel>Example Option 1</OptionLabel>
 * </Option>
 */
const Option: FC<ComponentProps<"input">> = ({
  className,
  children,
  ...otherProps
}) => {
  return (
    <label className="block w-full">
      <input
        type="radio"
        className={cn("hidden peer", className)}
        {...otherProps}
      />
      <div className="border border-primary-200 h-26 p-4 flex flex-col justify-between peer-checked:border-primary-500 peer-checked:text-primary-500 cursor-pointer">
        {children}
      </div>
    </label>
  );
};

const OptionsGroup: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => <div className={cn("gap-4", className)} {...otherProps} />;

const OptionIcon = Icon;

const OptionLabel: FC<ComponentProps<"div">> = ({
  className,
  ...otherProps
}) => <div className={cn("leading-5 mt-2", className)} {...otherProps} />;

export default Option;
export { OptionsGroup as OptionGroup, OptionIcon, OptionLabel };
