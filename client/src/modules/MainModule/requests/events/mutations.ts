import { MutationFactory } from "../../../../utils/vendors/TanStack/ReactQuery/mutationFactory";

interface CreateEventMutationInput {
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  body: string;
  group: string;
}

export const createEventMutation = (groupId: string) => MutationFactory<CreateEventMutationInput>(
  [
    ['groups', groupId],
    ['groups', groupId, 'activities']
  ], 
  '/v2/activities',
  'POST',
)

interface UpdateEventMutationInput {
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  body: string;
}

export const updateActivityMutation = (groupId: string, activityId: string) => MutationFactory<UpdateEventMutationInput>(
  [
    ['groups', groupId],
    ['groups', groupId, 'activities']
  ], 
  `/v2/activities/${activityId}`,
  'PATCH',
)

export const deleteActivityMutation = (groupId: string, activityId: string) => MutationFactory<{}>(
  [
    ['groups', groupId],
    ['groups', groupId, 'activities']
  ],
  `/v2/activities/${activityId}`,
  'DELETE',
)