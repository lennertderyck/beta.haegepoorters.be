"use client";

import {
    Collapsible,
    CollapsibleContent
} from "@/components/basics/Collapsible/Collapsible";
import Field, { FieldLabel } from "@/components/basics/Field/Field";
import Icon from "@/components/basics/Icon/Icon";
import Input from "@/components/basics/Input/Input";
import { cn } from "@/lib/utils/composers";

import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import { FC } from "react";
import { useActivityContext } from "./ActivityForm.context";

interface Props {}

const ActivityFormDateField: FC<Props> = () => {
  const { formState: state, activityType } = useActivityContext();

  const isMultiDayActivity =
    ACTIVITY_TYPES.find((type) => type.name === activityType)?.isMultiDay ||
    false;

  return (
    <Field>
      <FieldLabel>
        Selecteer een {isMultiDayActivity ? "periode" : "datum"}
      </FieldLabel>
      <div className="flex flex-col gap-x-[1ch] gap-y-1 ">
        <Input
          type="datetime-local"
          name="startDate"
          placeholder="Datum"
          required
          defaultValue={state.startDate}
          className={cn(
            "inline transition-[width] ease-in-out duration-300",
            isMultiDayActivity ? "w-[calc(100%-(var(--spacing)*4))]" : "w-full"
          )}
        />
        <Collapsible open={isMultiDayActivity}>
          <CollapsibleContent>
            <div className="flex gap-2 items-center">
              <Icon
                name="corner-down-right-line"
                className="text-stone-400 -translate-y-0.5 ml-2"
              />
              <Input
                type="datetime-local"
                name="endDate"
                placeholder="Einddatum"
                required={isMultiDayActivity}
                defaultValue={state.endDate}
                className="flex-1"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Field>
  );
};

export default ActivityFormDateField;
