import dayjs from "dayjs";

export const EVENTS_VIEW_MIN = dayjs().subtract(1, 'month').startOf("month").toISOString();
export const EVENTS_VIEW_MAX = dayjs(EVENTS_VIEW_MIN).add(4, 'month').endOf("month").toISOString();

export const MULTI_DAY_EVENT_TYPES = ['weekend', 'camp', 'multi'];

// const EVENTS_EDIT_MIN = dayjs().subtract(1, 'month').startOf("month");
// const EVENTS_EDIT_MAX = EVENTS_EDIT_MIN.add(4, 'months').endOf('month');