import { Activity, Event } from "../../../types/content";

export const sortGroupActivitiesByDate = (a: Activity, b: Activity) => {
    return new Date(a.period.start).valueOf() - new Date(b.period.start).valueOf();
}

export const sortGroupEventsByDate = (a: Event, b: Event) => {
    return new Date(a.start).valueOf() - new Date(b.start).valueOf();
}