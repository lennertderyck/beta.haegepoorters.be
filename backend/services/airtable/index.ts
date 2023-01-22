import { UpdateActivity } from "../../types/activities";

const Airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env['AIRTABLE_API_KEY']
});

const base = Airtable.base('appbn1WfHyRwCPlHS');

export default base;

export const getAllEditions = async () => {
    return await base('editions').select().all()
}
export const getAllActivities = async () => {
    return await base('activities').select().all()
}
export const getActivitiesByEdition = async (editionId: string) => {
    return await base('activities').select({
        filterByFormula: `{edition_id} = "${ editionId }"`
    }).all();
}
export const getActivitiesByEditionAndGroup = async (editionId: string, groupShortcode: string) => {
    return await base('activities').select({
        filterByFormula: `AND({edition_id} = "${ editionId }", {group_shortcodes} = "${ groupShortcode }")`,
    }).all();
}
export const getActivityById = async (activityId: string) => {
    return await base('activities').select({
        filterByFormula: `RECORD_ID() = "${ activityId }"`
    }).all();
}
export const createActivity = async (group: string, edition: string, event: UpdateActivity) => {
    return await base('activities').create([{
        "fields": {
            ...event,
            group: [group],
            editions: [edition],
        },
    }])
}
export const updateActivityById = async (activityId: string, event: UpdateActivity) => {
    return await base('activities').update([{
        "id": activityId,
        "fields": event,
    }])
}