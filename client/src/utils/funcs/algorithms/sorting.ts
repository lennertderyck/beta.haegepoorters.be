import { Activity } from "../../../types/content";

export const sortGroupActivitiesByDate = (a: Activity, b: Activity) => {
    return new Date(a.period.start).valueOf() - new Date(b.period.start).valueOf();
}