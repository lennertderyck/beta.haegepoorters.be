"use client";

import {
    Collapsible,
    CollapsibleContent
} from "@/components/basics/Collapsible/Collapsible";
import Icon from "@/components/basics/Icon/Icon";
import Input from "@/components/basics/Input/Input";
import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import dayjs from "dayjs";
import { FC, useActionState, useState } from "react";
import ActivityFormTypeSelector from "./ActivityFormTypeSelector";

interface ActivityFormState {
  title: string;
  date: string;
  description: string;
}

const initialActivityFormState: ActivityFormState = {
  date: dayjs()
    .add(1, "day")
    .hour(14)
    .minute(0)
    .second(0)
    .day(7)
    .format("YYYY-MM-DDTHH:mm"),
  title: "",
  description: ""
};

export const createUser = async (initialState: ActivityFormState) => {
  return initialState;
};

interface Props {}

const ActivityForm: FC<Props> = () => {
  const [state, formAction, pending] = useActionState<ActivityFormState>(
    createUser,
    initialActivityFormState
  );
  const [activityType, setActivityType] = useState<string | null>(null);

  const showDetailFields = activityType !== null;
  const isMultiDayActivity = ACTIVITY_TYPES.find(
    (type) => type.name === activityType
  )?.isMultiDay;

  return (
    <form action={formAction}>
      {pending ? <p>Loading...</p> : <p>Not loading</p>}
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
            <h4>Kies een titel voor deze activiteit</h4>
            <Input
              type="text"
              placeholder="Titel"
              defaultValue={initialActivityFormState.title}
            />
          </section>
          <section className="mt-6">
            <h4>Wanneer gaat de activiteit door?</h4>
            <div className="flex flex-col mt-4 gap-x-[1ch] gap-y-1">
              <Input
                type="datetime-local"
                name="startDate"
                placeholder="Datum"
                defaultValue={initialActivityFormState.date}
                className="inline"
              />
              <Collapsible open={isMultiDayActivity}>
                <CollapsibleContent>
                  <div className="flex gap-1 items-center">
                    <Icon
                      name="corner-down-right-line"
                      className="text-gray-400 -translate-y-0.5"
                    />
                    <Input
                      type="datetime-local"
                      name="endDate"
                      placeholder="Einddatum"
                      defaultValue={initialActivityFormState.date}
                      className="flex-1"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </section>
          <section className="mt-6">
            <h4>Geef een beschrijving aan de activiteit</h4>
            <textarea
              name="description"
              defaultValue={initialActivityFormState.description}
              className="w-full"
            />
          </section>
        </CollapsibleContent>
      </Collapsible>
    </form>
  );
};

export default ActivityForm;
