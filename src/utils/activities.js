import dayjs from 'dayjs';

export const sortActivitiesByDate = (
    { period: { start: a }}, 
    { period: { start: b }},
) => {
    return new Date(a) - new Date(b)
};

export const activityIsPassed = (date) => dayjs(new Date()).isAfter(dayjs(date), 'day');

export const findFirstActivity = (acts) => {
    return acts?.find(({ period: { start }}) => !activityIsPassed(start))
}

export const checkActivities = (acts, group_acts) => {
    if (!group_acts) return findFirstActivity(acts)
    
    const { period: { start: a }} = findFirstActivity(acts);
    const { period: { start: b }} = group_acts;
    
    const diff = dayjs(a).diff(dayjs(b))

    return diff !== 0 ? findFirstActivity(acts) : null
}