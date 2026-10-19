"use server";

import { deleteActivityMutation } from "@/lib/actions/queries/activities";

export const deleteActivityAction = async (activityId: string) => {
  try {
    await deleteActivityMutation(activityId);
  } catch (error) {
    console.log({ error });
  }
};
