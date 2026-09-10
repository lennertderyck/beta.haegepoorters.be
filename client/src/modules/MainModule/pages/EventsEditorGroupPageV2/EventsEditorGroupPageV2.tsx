import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import dayjs from "dayjs";
import { FC } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../../../components/basics";
import EventListItem from "../../../../components/elements/EventListItem/EventListItem";
import {
    getGroupActivitiesQuery,
    getGroupDetailQuery
} from "../../requests/events/queries";
import EventItemLoader from "../EventsPage/EventItemLoader";

interface Props {}

const EventsEditorGroupPageV2: FC<Props> = () => {
    const groupId = useParams<{ groupId: string }>().groupId;
    const [searchParams] = useSearchParams();
    const selectedPeriod =
        searchParams.get("month") || dayjs().format("YYYY-MM-DD");

    const groupQuery = useQuery(getGroupDetailQuery(String(groupId)));
    const activitiesQuery = useQuery(
        getGroupActivitiesQuery({
            groupId: String(groupId),
            startDate: dayjs(selectedPeriod).startOf("month").toISOString(),
            endDate: dayjs(selectedPeriod).endOf("month").toISOString()
        })
    );

    const periodTemplate = [-1, 0, 1, 2, 3];
    const period = periodTemplate.map((i) =>
        dayjs().add(i, "month").toISOString()
    );

    const group = groupQuery.data?.group;
    const events = activitiesQuery.data?.activities;

    return (
        <div className="page">
            <div className="page__header">
                <Button to="../" icon="arrow-left" iconPlacement="start">
                    Overzicht groepen
                </Button>
                {group && (
                    <>
                        <div className="mt-12 flex flex-col lg:flex-row justify-between">
                            <h1 className="page__title">{group.name}</h1>
                            <Button to="new" icon="add" iconPlacement="end">
                                Activiteit toevoegen
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8 lg:mt-0 mb-8">
                            {period.map((month, monthIndex) => {
                                const isSelected = dayjs(month).isSame(
                                    selectedPeriod,
                                    "month"
                                );

                                return (
                                    <Button
                                        key={monthIndex}
                                        theme="simple"
                                        to={`?month=${dayjs(month).format("YYYY-MM-DD")}`}
                                    >
                                        <span
                                            className={classNames(
                                                isSelected &&
                                                    "border-b-2 border-red-500 pb-1"
                                            )}
                                        >
                                            {dayjs(month).format(`MMMM 'YY`)}
                                        </span>
                                    </Button>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            <div className="page__content">
                {events?.length === 0 && (
                    <p className="text-gray-400">
                        Geen activiteiten om weer te geven
                    </p>
                )}
                {activitiesQuery?.isLoading && <EventItemLoader />}
                {events?.map((activity: any) => (
                    <div key={activity._id}>
                        <Link to={`${activity._id}/edit`}>
                            <EventListItem
                                editable
                                event={{
                                    startDate: activity.startDate,
                                    endDate: activity.endDate,
                                    title: activity.title,
                                    type: activity.type,
                                    body: activity.body
                                }}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsEditorGroupPageV2;
