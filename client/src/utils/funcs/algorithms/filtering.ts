import dayjs from "dayjs";
import { Activity, Event } from "../../../types/content";

export const findFirstActivityToDoByDate = (activity: Activity) => {
    return !dayjs(dayjs()).isAfter(dayjs(activity.period.start), 'day');
}

export const findFirstEventToDoByDate = (event: Event) => {
    const diff = dayjs().diff(event.start, 'day', true);
    return diff < 0;
};