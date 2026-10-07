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
import { ActivityTypes } from "@/lib/actions/queries/activities";
import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import { cn } from "@/lib/utils/composers";
import dayjs from "dayjs";
import { FC, useActionState, useState, useTransition } from "react";
import ActivityFormTypeSelector from "./ActivityFormTypeSelector";

export interface ActivityFormState {
  title: string;
  startDate: string;
  endDate: string;
  body: string;
  type: ActivityTypes | null;
}

export interface ActivityFormSubmitState extends ActivityFormState {
  type: ActivityTypes;
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
  body: "",
  type: null
};

interface Props {
  action: (reaction: ActivityFormSubmitState) => Promise<void>;
  deleteAction?: () => Promise<void>;
  actionType: "create" | "update";
  defaultValue?: ActivityFormState;
}

const ActivityForm: FC<Props> = ({
  action,
  deleteAction,
  actionType,
  defaultValue = initialActivityFormState
}) => {
  const [activityType, setActivityType] = useState<ActivityTypes | null>(
    defaultValue.type
  );
  const [title, setTitle] = useState(defaultValue.title);

  const [state, formAction, pending] = useActionState(
    async (_formState: ActivityFormState, formData: FormData) => {
      const entries = Object.fromEntries(
        formData.entries().map(([key, value]) => [key, value.toString()])
      );

      const newState: ActivityFormSubmitState = {
        title,
        body: entries.body,
        type: entries.type as ActivityTypes,
        startDate: entries.startDate,
        endDate: entries.endDate
      };

      await action(newState);
      setActivityType(defaultValue.type);
      setTitle(defaultValue.title);

      return newState;
    },
    defaultValue
  );

  const [deleteState, formDeleteAction, deletePending] = useActionState(
    async () => {
      deleteAction?.();
    },
    null
  );

  const [transition, startTransition] = useTransition();

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
        name="type"
        className="mt-4"
        defaultValue={state.type}
        onValueChange={(_value, payload) => {
          setActivityType(payload as ActivityTypes);
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
                defaultValue={state.title}
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
                  defaultValue={state.startDate}
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
                        defaultValue={state.endDate}
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
                name="body"
                defaultValue={state.body}
                className="w-full"
                required
                rows={6}
                placeholder="Schrijf iets over de activiteit."
              />
            </Field>
          </section>
          <div className="flex gap-4 justify-between">
            {actionType === "update" && deleteAction && (
              <Button
                className="mt-4"
                type="button"
                variant="tertiary"
                disabled={transition}
                onClick={() => startTransition(() => deleteAction())}
              >
                Activiteit verwijderen
              </Button>
            )}
            <Button className="mt-4" type="submit" disabled={pending}>
              {actionType === "create"
                ? "Activiteit toevoegen"
                : "Activiteit bijwerken"}
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </form>
  );
};

export default ActivityForm;
