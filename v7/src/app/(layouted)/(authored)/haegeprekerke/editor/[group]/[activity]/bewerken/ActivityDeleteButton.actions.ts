"use server";

import { deleteActivityMutation } from "@/lib/actions/queries/activities";
import { defineAction } from "@/lib/auth/action";
import { z } from "zod";

export const deleteActivityAction = defineAction(
  { capabilities: ["leader", "webmaster"], input: z.string().min(1) },
  async (activityId) => {
    try {
      await deleteActivityMutation(activityId);
    } catch (error) {
      console.log({ error });
    }
  },
);
