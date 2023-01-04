import dayjs from "dayjs";
import { Activity } from "../../../types/content";

export const findFirstActivityToDoByDate = (activity: Activity) => {
    return !dayjs(dayjs()).isAfter(dayjs(activity.period.start), 'day');
}