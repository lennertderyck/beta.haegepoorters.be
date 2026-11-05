"use server";

import { defineAction } from "@/lib/auth/action";
import { deleteActivityMutation } from "@/lib/server/queries/activities";
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
