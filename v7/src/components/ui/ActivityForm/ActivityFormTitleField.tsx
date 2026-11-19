"use client";

import {
    Collapsible,
    CollapsibleContent
} from "@/components/basics/Collapsible/Collapsible";
import Field, { FieldLabel } from "@/components/basics/Field/Field";
import Input from "@/components/basics/Input/Input";
import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import { FC } from "react";
import { useActivityContext } from "./ActivityForm.context";

interface Props {}

const ActivityFormTitleField: FC<Props> = () => {
  const {
    formState: state,
    activityType,
    title,
    setTitle
  } = useActivityContext();

  const isTitleAvailable = title.trim().length > 0;
  const activityTypeDescriptor = !activityType
    ? null
    : ACTIVITY_TYPES.find((type) => type.name === activityType)?.descriptor;
  const isWithoutActivityTypeDescriptor = activityTypeDescriptor === null;
  const isTitleRequired = isWithoutActivityTypeDescriptor;
  const isTitleOptionalLabelVisible = isTitleRequired === false;

  return (
    <Field>
      <FieldLabel className="flex items-baseline">
        Kies een titel voor deze activiteit
        <Collapsible
          open={isTitleOptionalLabelVisible}
          className="inline-block"
        >
          <CollapsibleContent>
            <>&nbsp;{"(optioneel)"}</>
          </CollapsibleContent>
        </Collapsible>
      </FieldLabel>
      <Input
        type="text"
        placeholder="Titel"
        required={isTitleRequired}
        defaultValue={state.title}
        onKeyUp={(event) => {
          setTitle(event.currentTarget.value);
        }}
      />
      <Collapsible open={isTitleAvailable || activityTypeDescriptor !== null}>
        <CollapsibleContent>
          <p className="mt-2">
            <small>
              Wordt weergegeven als{" "}
              <strong className="font-medium">
                {" "}
                {activityTypeDescriptor !== null && (
                  <>
                    {activityTypeDescriptor}
                    {isTitleAvailable ? ": " : ""}
                  </>
                )}
                {title}
              </strong>
            </small>
          </p>
        </CollapsibleContent>
      </Collapsible>
    </Field>
  );
};

export default ActivityFormTitleField;
