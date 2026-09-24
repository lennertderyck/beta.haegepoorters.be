import Boundary, {
  BoundaryContainer,
  BoundaryContent
} from "@/components/basics/Boundary/Boundary";
import Button from "@/components/basics/Button/Button";
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardsGroup,
  CardTitle
} from "@/components/basics/Card/Card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/basics/Collapsible/Collapsible";
import Icon from "@/components/basics/Icon/Icon";
import {
  Section,
  SectionHeader,
  SectionTitle
} from "@/components/basics/Section/Section";
import ActivitySchedule, {
  ActivityScheduleItem,
  ActivityScheduleItemLabel,
  ActivityScheduleItemTitle,
  ActivityScheduleList,
  ActivityScheduleTime
} from "@/components/elements/ActivitySchedule/ActivitySchedule";
import StartpageHero from "@/components/ui/StartpageHero/StartpageHero";
import { getActivitiesPreviewForNextWeekGroupedByDate } from "@/lib/actions/queries/activities";
import { STARTPAGE_ADDITIONAL_INFO_CARDS } from "@/lib/constants/static";
import { cn } from "@/lib/utils/composers";
import Link from "next/link";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = async () => {
  const activitiesGroupedByDate =
    await getActivitiesPreviewForNextWeekGroupedByDate();

  return (
    <Boundary>
      <BoundaryContainer className="lg:py-12">
        <BoundaryContent>
          <div className="grid grid-cols-12 gap-y-12 lg:gap-12">
            <div className="col-span-12 lg:col-span-8">
              <Section>
                <SectionHeader>
                  <SectionTitle asChild>
                    <Link href="/haegeprekerke">
                      <h4>Aankomende activiteiten</h4>
                      <Icon name="arrow-right-line" />
                    </Link>
                  </SectionTitle>
                </SectionHeader>
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
                                          ["text-neutral-400"]:
                                            isActivityTitleEmpty
                                        })}
                                      >
                                        {isActivityTitleEmpty
                                          ? "Activiteit zonder titel"
                                          : activityTitle}
                                      </ActivityScheduleItemTitle>
                                    </button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent duration="faster">
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
              </Section>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Section>
                <SectionHeader>
                  <SectionTitle asChild>
                    <Link href="/blog">
                      <h4>Nieuwtjes & blog</h4>
                      <Icon name="arrow-right-line" />
                    </Link>
                  </SectionTitle>
                </SectionHeader>
                <ul className="w-full border-b border-neutral-300">
                  <li>Blog item 1</li>
                </ul>
              </Section>
            </div>
          </div>
        </BoundaryContent>
        <BoundaryContent className="px-0 mt-12">
          <StartpageHero />
        </BoundaryContent>
        <BoundaryContent className="mt-12">
          <Section>
            <SectionHeader className="mb-0">
              <SectionTitle>Komt ook van pas ...</SectionTitle>
            </SectionHeader>
            <CardsGroup sizing="compact">
              {STARTPAGE_ADDITIONAL_INFO_CARDS.map((cardInfo) => {
                return (
                  <Card>
                    <CardHeader>
                      <CardTitle>{cardInfo.title}</CardTitle>
                    </CardHeader>
                    <CardContent>{cardInfo.content}</CardContent>
                    <CardFooter>
                      <Button variant="tertiary" asChild>
                        <Link href={cardInfo.buttonHref}>
                          {cardInfo.buttonLabel}{" "}
                          <Icon name="arrow-right-up-line" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </CardsGroup>
          </Section>
        </BoundaryContent>
      </BoundaryContainer>
    </Boundary>
  );
};

export default Page;
