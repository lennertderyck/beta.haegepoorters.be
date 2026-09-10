import Button from "@/components/basics/Button/Button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/basics/Collapsible/Collapsible";
import Icon from "@/components/basics/Icon/Icon";
import ActivitySchedule, {
    ActivityScheduleItem,
    ActivityScheduleItemLabel,
    ActivityScheduleItemTitle,
    ActivityScheduleList,
    ActivityScheduleTime
} from "@/components/elements/ActivitySchedule/ActivitySchedule";
import { getActivitiesPreviewForNextWeekGroupedByDate } from "@/lib/actions/queries/activities";
import { cn } from "@/lib/utils/composers";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = async () => {
  const activitiesGroupedByDate =
    await getActivitiesPreviewForNextWeekGroupedByDate();

  return (
    <main className="py-12 px-6 mx-auto w-full">
      <div className="grid grid-cols-12 gap-y-12 lg:gap-12">
        <div className="col-span-12 lg:col-span-8">
          <section>
            <Link
              href="/haegeprekerke"
              className="flex items-center gap-4 text-gray-600"
            >
              <h4 className="font-serif text-2xl">Aankomende activiteiten</h4>
              <Icon name="arrow-right-line" />
            </Link>
            <ul>
              {activitiesGroupedByDate.map((dateGroup) => (
                <li key={dateGroup.dateGroup}>
                  <ActivitySchedule>
                    <ActivityScheduleTime dateTime={dateGroup.dateGroup} />
                    <ActivityScheduleList>
                      {dateGroup.items.map((groupedActivity) => {
                        const activityTitle = String(
                            groupedActivity.activity.title
                          ).trim(),
                          isActivityTitleEmpty = activityTitle.length === 0;

                        const activityDescription = String(
                            groupedActivity.activity.body
                          ).trim(),
                          isActivityDescriptionEmpty =
                            activityDescription.length === 0;

                        return (
                          <Collapsible
                            asChild
                            key={groupedActivity.activity._id}
                          >
                            <ActivityScheduleItem>
                              <CollapsibleTrigger asChild>
                                <button className="text-left cursor-pointer w-full">
                                  <ActivityScheduleItemLabel>
                                    {groupedActivity.group.name}
                                  </ActivityScheduleItemLabel>
                                  <ActivityScheduleItemTitle
                                    className={cn({
                                      ["text-gray-400"]: isActivityTitleEmpty
                                    })}
                                  >
                                    {isActivityTitleEmpty
                                      ? "Activiteit zonder titel"
                                      : activityTitle}
                                  </ActivityScheduleItemTitle>
                                </button>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                {!isActivityDescriptionEmpty && (
                                  <p className="text-base mt-2">
                                    {activityDescription}
                                  </p>
                                )}
                                <Button
                                  variant="tertiary"
                                  className="mt-2"
                                  asChild
                                >
                                  <Link
                                    href={{
                                      pathname: `/haegeprekerke/${groupedActivity.group.abbr}`,
                                      query: {
                                        datum: dateGroup.dateGroup
                                      }
                                    }}
                                    className="text-blue-500 mt-2 inline-block"
                                  >
                                    Meer lezen
                                    <Icon name="arrow-right-line" />
                                  </Link>
                                </Button>
                              </CollapsibleContent>
                            </ActivityScheduleItem>
                          </Collapsible>
                        );
                      })}
                    </ActivityScheduleList>
                  </ActivitySchedule>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="col-span-12 lg:col-span-4"></div>
      </div>
    </main>
  );
};

export default Page;
