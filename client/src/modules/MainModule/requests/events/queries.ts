import { QueryFactory } from "../../../../utils/vendors/TanStack/ReactQuery/queryFactory";

type GroqResponse<T> = T & {
    _id: string;
    _updatedAt: string;
    _createdAt: string;
};

type GroupReponse = GroqResponse<{
    name: string;
    abbr: string;
    order: number;
}>;

type GroupsResponse = GroupReponse[];

export const getGroupsQuery = QueryFactory<GroupsResponse>(
    ["groups"],
    "/v2/groups"
);

export type ActivityTypes = "none" | "camp" | "weekend" | "multi";
export type ActivityReponse = GroqResponse<{
    title: string;
    type: ActivityTypes;
    startDate: string;
    endDate: string;
    body: any;
}>;

interface GroupDetailResponse {
    group: GroupReponse;
    activities: ActivityReponse[];
}
export const getGroupDetailQuery = (groupId: string) => {
    return QueryFactory<GroupDetailResponse>(
        ["groups", groupId],
        `/v2/groups/${groupId}`
    );
};

interface GroupActivitiesRequest {
    groupId: string;
    startDate: string;
    endDate: string;
}
interface GroupActivitiesResponse {
    group: GroupReponse;
    activities: ActivityReponse[];
}
export const getGroupActivitiesQuery = (options: GroupActivitiesRequest) => {
    return QueryFactory<GroupActivitiesResponse>(
        [
            "groups",
            options.groupId,
            "activities",
            { startDate: options.startDate, endDate: options.endDate }
        ],
        `/v2/groups/${options.groupId}/activities`,
        {
            params: {
                startDate: options.startDate,
                endDate: options.endDate
            }
        }
    );
};

export const getActivityByIdQuery = (groupId: string, activityId: string) => {
    return QueryFactory<ActivityReponse>(
        ["groups", groupId, "activities", activityId],
        `/v2/activities/${activityId}`
    );
};

export interface TimelinePreviewResponse {
    timelineForGroups: {
        group: GroupReponse;
        upcomingActivity: ActivityReponse;
    }[];
}
export const getUpcomingActivitiesQuery = QueryFactory<TimelinePreviewResponse>(
    ["activities", "upcoming"],
    "/v2/activities/timeline/preview"
);

interface TimelineRequestOptions {
    startDate: string;
    endDate: string;
}
interface TimelineResponse {
    timelineForGroups: {
        group: GroupReponse;
        upcomingActivities: ActivityReponse[];
    }[];
}
export const getActivitiesTimelinesQuery = (
    options?: TimelineRequestOptions
) => {
    return QueryFactory<TimelineResponse>(
        [
            "activities",
            "timelines",
            { startDate: options?.startDate, endDate: options?.endDate }
        ],
        "/v2/activities/timeline",
        { params: options }
    );
};
