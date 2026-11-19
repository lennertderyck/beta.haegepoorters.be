import Field, { FieldLabel } from "@/components/basics/Field/Field";
import Textarea from "@/components/basics/Textarea/Textarea";
import {
    getGeneralGroupActivitiesForDateRangeQuery,
    type ActivityTypes
} from "@/lib/server/queries/activities";
import dayjs from "dayjs";
import { FC } from "react";
import ActivityFormProvider from "./ActivityForm.context";
import ActivityFormDateField from "./ActivityFormDateField";
import ActivityFormDetailFields from "./ActivityFormDetailFields";
import ActivityFormLinkedActivitySelector from "./ActivityFormLinkedActivitySelector";
import ActivityFormSubmit from "./ActivityFormSubmit";
import ActivityFormTitleField from "./ActivityFormTitleField";
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
  intent: "create" | "update";
  defaultValue?: ActivityFormState;
}

const ActivityForm: FC<Props> = async ({
  action,
  intent,
  defaultValue = initialActivityFormState
}) => {
  const df = await getGeneralGroupActivitiesForDateRangeQuery();

  return (
    <ActivityFormProvider
      action={action}
      intent={intent}
      defaultValue={defaultValue}
    >
      <Field>
        <FieldLabel>Wat voor soort activiteit is het?</FieldLabel>
        <ActivityFormTypeSelector name="type" className="mt-4" />
      </Field>

      <ActivityFormDetailFields>
        <section className="mt-6">
          <ActivityFormLinkedActivitySelector activities={df} />
        </section>
        <section className="mt-6">
          <ActivityFormTitleField />
        </section>
        <section className="mt-6">
          <ActivityFormDateField />
        </section>
        <section className="mt-6">
          <Field>
            <FieldLabel>Geef een beschrijving aan de activiteit</FieldLabel>
            <Textarea
              name="body"
              defaultValue={defaultValue.body}
              className="w-full"
              required
              rows={6}
              placeholder="Schrijf iets over de activiteit."
            />
          </Field>
        </section>
        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-4 items-center justify-between">
          <ActivityFormSubmit />
        </div>
      </ActivityFormDetailFields>
    </ActivityFormProvider>
  );
};

export default ActivityForm;
