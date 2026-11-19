"use client";

import Button from "@/components/basics/Button/Button";
import {
    Collapsible,
    CollapsibleContent
} from "@/components/basics/Collapsible/Collapsible";
import Field, { FieldLabel } from "@/components/basics/Field/Field";
import Icon from "@/components/basics/Icon/Icon";
import Notice from "@/components/basics/Notice/Notice";
import ActivitySchedule, {
    ActivityScheduleItem,
    ActivityScheduleItemTitle,
    ActivityScheduleList,
    ActivityScheduleTime
} from "@/components/elements/ActivitySchedule/ActivitySchedule";
import { type Activity } from "@/lib/server/queries/activities";
import { composeActivityTitle } from "@/lib/utils/composers";
import Link from "next/link";
import { FC } from "react";
import { useActivityContext } from "./ActivityForm.context";

interface Props {
  activities: Activity[];
}

const ActivityFormLinkedActivitySelector: FC<Props> = ({ activities }) => {
  const { activityType } = useActivityContext();

  const isCanceledActivity = activityType === "none";

  return (
    <Collapsible open={isCanceledActivity}>
      <CollapsibleContent>
        <Field>
          <FieldLabel>Verwijs naar een groepsactiviteit</FieldLabel>
          <p className="mb-4">
            <small>
              Je kan naar een groepsactiviteit verwijzen (bv. Spaghettiavond)
              als reden voor het niet doorgaan van een vergadering.
            </small>
          </p>
          {activities.length === 0 && (
            <Notice>
              Er zijn momenteel geen groepsactiviteiten beschikbaar om naar te
              verwijzen. Je kan zelf een groespsactiviteit aanmaken indien
              nodig.
              <Button className="mt-4" variant="tertiary" asChild>
                <Link
                  href="/haegeprekerke/editor/grp/toevoegen"
                  target="_blank"
                >
                  Maak een groepsactiviteit aan{" "}
                  <Icon name="arrow-right-up-line" />
                </Link>
              </Button>
              <p>
                <small>
                  Hierna kan je terugkeren naar het formulier om de activiteit
                  te koppelen.
                </small>
              </p>
            </Notice>
          )}
          {activities.length > 0 && (
            <ul>
              {activities.map((activity) => (
                <label>
                  <ActivitySchedule density="compact">
                    <input
                      type="radio"
                      name="linked"
                      value={activity._id}
                      className="self-center"
                    />
                    <ActivityScheduleTime dateTime={activity.startDate} />
                    <ActivityScheduleList>
                      <ActivityScheduleItem>
                        <ActivityScheduleItemTitle>
                          {composeActivityTitle(activity)}
                        </ActivityScheduleItemTitle>
                      </ActivityScheduleItem>
                    </ActivityScheduleList>
                  </ActivitySchedule>
                </label>
              ))}
            </ul>
          )}
        </Field>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ActivityFormLinkedActivitySelector;
