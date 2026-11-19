"use client";

import Icon, { IconName } from "@/components/basics/Icon/Icon";
import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import { cn } from "@/lib/utils/composers";
import { ComponentProps, FC } from "react";
import { useActivityContext } from "./ActivityForm.context";

const ACTIVITY_TYPE_ICON_MAP = {
  default: "sun-line",
  weekend: "building-2-line",
  camp: "tent-line",
  multi: "road-map-line",
  none: "calendar-close-line",
  linked: "connector-line"
} satisfies Record<(typeof ACTIVITY_TYPES)[number]["name"], IconName>;

interface Props extends Omit<ComponentProps<"ul">, "defaultValue"> {
  name: string;
}

const ActivityFormTypeSelector: FC<Props> = ({
  name,
  className,
  ...otherProps
}) => {
  const { activityType, formState, setActivityType } = useActivityContext();

  const state = activityType;

  const bindInputChangeHandler =
    (value: string) => (_event: React.ChangeEvent<HTMLInputElement>) => {
      setActivityType(value as any);
    };

  const activityTypeOptions = ACTIVITY_TYPES.filter(
    (activityType) => activityType.features.isInTypeSelector
  );

  return (
    <ul
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )}
      {...otherProps}
    >
      {activityTypeOptions.map((activityType) => (
        <li key={activityType.name} className="col-span-1">
          <label>
            <input
              type="radio"
              name={name}
              value={activityType.name}
              className="hidden peer"
              onChange={bindInputChangeHandler(activityType.name)}
              checked={state === activityType.name}
            />
            <div className="border border-primary-200 h-26 p-4 flex flex-col justify-between peer-checked:border-primary-500 peer-checked:text-primary-500 cursor-pointer">
              <Icon
                name={ACTIVITY_TYPE_ICON_MAP[activityType.name]}
                size="1.3rem"
              />
              <div className="leading-5 mt-2">{activityType.label}</div>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFormTypeSelector;
