import Icon from "@/components/basics/Icon/Icon";
import { cn } from "@/lib/utils/composers";
import { Select as BaseSelect } from "@base-ui/react/select";
import { ComponentProps, FC } from "react";

export const Select = BaseSelect.Root;

export const SelectLabel: FC<ComponentProps<typeof BaseSelect.Label>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <BaseSelect.Label
      className={(state) =>
        cn("flex", className instanceof Function ? className(state) : className)
      }
      {...otherProps}
    >
      {children}
    </BaseSelect.Label>
  );
};

export const SelectTrigger: FC<ComponentProps<typeof BaseSelect.Trigger>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <BaseSelect.Trigger
      className={(state) =>
        cn(
          "flex items-center justify-between border border-stone-200 px-3 py-2 w-full",
          className instanceof Function ? className(state) : className
        )
      }
      {...otherProps}
    >
      {children}
      <div>
        <Icon name="arrow-down-s-line" />
      </div>
    </BaseSelect.Trigger>
  );
};

export const SelectValue: FC<ComponentProps<typeof BaseSelect.Value>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <BaseSelect.Value
      className={(state) =>
        cn(
          "text-nowrap",
          className instanceof Function ? className(state) : className
        )
      }
      {...otherProps}
    >
      {children}
    </BaseSelect.Value>
  );
};

export const SelectContent: FC<ComponentProps<typeof BaseSelect.Popup>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={4} alignItemWithTrigger={false}>
        <BaseSelect.Popup
          className={(state) =>
            cn(
              "bg-white border border-stone-200 shadow-xl w-(--anchor-width) origin-(--transform-origin)",
              className instanceof Function ? className(state) : className
            )
          }
          {...otherProps}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
};

export const SelectItem: FC<ComponentProps<typeof BaseSelect.Item>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <BaseSelect.Item
      className={(state) =>
        cn(
          "flex gap-2 p-3 cursor-pointer",
          className instanceof Function ? className(state) : className
        )
      }
      {...otherProps}
    >
      <BaseSelect.ItemIndicator
        keepMounted
        render={(_props, state) => (
          <div>
            <Icon
              name={state.selected ? "checkbox-line" : "checkbox-blank-line"}
              className={cn({
                ["text-stone-300"]: !state.selected
              })}
            />
          </div>
        )}
      />
      <BaseSelect.ItemText className="text-left truncate">
        {children}
      </BaseSelect.ItemText>
    </BaseSelect.Item>
  );
};
