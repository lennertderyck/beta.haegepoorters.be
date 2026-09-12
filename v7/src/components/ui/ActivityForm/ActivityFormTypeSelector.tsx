"use client";

import Icon, { IconName } from "@/components/basics/Icon/Icon";
import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import { FC, useActionState } from "react";

const ACTIVITY_TYPE_ICON_MAP = {
  default: "sun-line",
  weekend: "building-2-line",
  camp: "tent-line",
  multi: "road-map-line",
  none: "calendar-close-line"
} satisfies Record<(typeof ACTIVITY_TYPES)[number]["name"], IconName>;

interface Props {
  defaultValue: string | null;
  onValueChange: (
    value: string | null,
    payload: string | null
  ) => string | null;
}

const ActivityFormTypeSelector: FC<Props> = ({
  defaultValue: defaultValue,
  onValueChange
}) => {
  const [state, action] = useActionState(onValueChange, defaultValue);

  const bindInputChangeHandler =
    (value: string) => (_event: React.ChangeEvent<HTMLInputElement>) => {
      action(value);
    };

  return (
    <>
      <h4>Wat voor soort activiteit is het?</h4>
      <section className="mt-4">
        <ul className="grid grid-cols-4 gap-4">
          {ACTIVITY_TYPES.map((activityType) => (
            <li key={activityType.name} className="col-span-1 ">
              <label>
                <input
                  type="radio"
                  name="activityType"
                  value={activityType.name}
                  className="hidden peer"
                  onChange={bindInputChangeHandler(activityType.name)}
                  checked={state === activityType.name}
                />
                <div className="border border-primary-200 h-26 p-4 flex flex-col justify-between peer-checked:border-primary-500 peer-checked:text-primary-500 cursor-pointer">
                  <Icon name={ACTIVITY_TYPE_ICON_MAP[activityType.name]} />
                  <div className="leading-5 mt-2">{activityType.label}</div>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ActivityFormTypeSelector;
