"use client";

import Button from "@/components/basics/Button/Button";
import {
    Collapsible,
    CollapsibleContent
} from "@/components/basics/Collapsible/Collapsible";
import Field, { FieldLabel } from "@/components/basics/Field/Field";
import Icon from "@/components/basics/Icon/Icon";
import Input from "@/components/basics/Input/Input";
import Textarea from "@/components/basics/Textarea/Textarea";
import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import { cn } from "@/lib/utils/composers";
import dayjs from "dayjs";
import { FC, useActionState, useState } from "react";
import ActivityFormTypeSelector from "./ActivityFormTypeSelector";

interface ActivityFormState {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

const DEFAULT_START_DATE = dayjs()
  .add(1, "day")
  .hour(14)
  .minute(0)
  .second(0)
  .day(7);

const initialActivityFormState: ActivityFormState = {
  startDate: DEFAULT_START_DATE.format("YYYY-MM-DDTHH:mm"),
  endDate: DEFAULT_START_DATE.hour(17).format("YYYY-MM-DDTHH:mm"),
  title: "",
  description: ""
};

export const createUser = async (
  formState: ActivityFormState,
  formData: FormData
) => {
  console.log({ ...formState, ...Object.fromEntries(formData.entries()) });

  return formState;
};

interface Props {}

const ActivityForm: FC<Props> = () => {
  const [state, formAction, pending] = useActionState(
    createUser,
    initialActivityFormState
  );
  const [activityType, setActivityType] = useState<string | null>(null);
  const [title, setTitle] = useState(initialActivityFormState.title);

  const showDetailFields = activityType !== null;
  const isMultiDayActivity = ACTIVITY_TYPES.find(
    (type) => type.name === activityType
  )?.isMultiDay;

  const isTitleFilled = title.trim().length > 0;
  const activityTypeDescriptor = !activityType
    ? null
    : ACTIVITY_TYPES.find((type) => type.name === activityType)?.descriptor;

  const isWithoutActivityTypeDescriptor = activityTypeDescriptor === null;
  const isTitleRequired = isWithoutActivityTypeDescriptor;
  const isTitleOptionalLabelVisible = isTitleRequired === false;

  return (
    <form action={formAction}>
      <h4>Wat voor soort activiteit is het?</h4>
      <ActivityFormTypeSelector
        className="mt-4"
        defaultValue={null}
        onValueChange={(_value, payload) => {
          setActivityType(payload);
          return payload;
        }}
      />
      <Collapsible open={showDetailFields}>
        <CollapsibleContent>
          <section className="mt-8">
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
                defaultValue={initialActivityFormState.title}
                onKeyUp={(event) => {
                  setTitle(event.currentTarget.value);
                }}
              />
              <Collapsible
                open={isTitleFilled || activityTypeDescriptor !== null}
              >
                <CollapsibleContent>
                  <p className="mt-2">
                    <small>
                      Wordt weergegeven als{" "}
                      <strong className="font-medium">
                        {" "}
                        {activityTypeDescriptor !== null && (
                          <>
                            {activityTypeDescriptor}
                            {isTitleFilled ? ": " : ""}
                          </>
                        )}
                        {title}
                      </strong>
                    </small>
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </Field>
          </section>
          <section className="mt-6">
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
                  defaultValue={initialActivityFormState.startDate}
                  className={cn(
                    "inline transition-[width] ease-in-out duration-300",
                    isMultiDayActivity
                      ? "w-[calc(100%-(var(--spacing)*4))]"
                      : "w-full"
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
                        defaultValue={initialActivityFormState.endDate}
                        className="flex-1"
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </Field>
          </section>
          <section className="mt-6">
            <Field>
              <FieldLabel>Geef een beschrijving aan de activiteit</FieldLabel>
              <Textarea
                name="description"
                defaultValue={initialActivityFormState.description}
                className="w-full"
                required
                rows={6}
                placeholder="Schrijf iets over de activiteit."
              />
            </Field>
          </section>
          <Button className="mx-auto mt-4">Activiteit toevoegen</Button>
        </CollapsibleContent>
      </Collapsible>
    </form>
  );
};

export default ActivityForm;
