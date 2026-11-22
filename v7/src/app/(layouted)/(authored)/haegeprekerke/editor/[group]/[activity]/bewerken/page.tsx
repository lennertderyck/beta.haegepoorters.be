import Article, {
    ArticleContent,
    ArticleHeader,
    ArticleHeaderContent,
    ArticleTitle
} from "@/components/basics/Article/Article";
import ActivityForm, {
    ActivityFormSubmitState
} from "@/components/ui/ActivityForm/ActivityForm";
import { requireCapability } from "@/lib/auth/guards";
import {
    activityInputSchema,
    getActivityById,
    updateActivityMutation
} from "@/lib/server/queries/activities";
import { redirect } from "next/navigation";
import { FC } from "react";
import ActivityDeleteButton from "./ActivityDeleteButton";

const Page: FC<
  PageProps<"/haegeprekerke/editor/[group]/[activity]/bewerken">
> = async ({ params }) => {
  const { activity: activityParam, group } = await params;
  const [activity] = await Promise.all([getActivityById(activityParam)]);

  const updateActivity = async (reaction: ActivityFormSubmitState) => {
    "use server";

    await requireCapability("leader", "webmaster");
    const input = activityInputSchema.parse(reaction);

    try {
      await updateActivityMutation(activityParam, input);
    } catch (error) {
      console.log({ error });
    }

    redirect(
      `/haegeprekerke/editor/${group}?status=success&activiteit=${activityParam}`
    );
  };

  return (
    <Article>
      <ArticleHeaderContent>
        <ArticleHeader className="flex flex-wrap gap-4 justify-between">
          <ArticleTitle>Activiteit bewerken</ArticleTitle>
          <ActivityDeleteButton
            activityId={activityParam}
            redirectUrl={`/haegeprekerke/editor/${group}?status=success`}
          />
        </ArticleHeader>
      </ArticleHeaderContent>
      <ArticleContent>
        <ActivityForm
          action={updateActivity}
          intent="update"
          defaultValue={{
            title: activity.title,
            startDate: activity.startDate,
            endDate: activity.endDate,
            body: activity.body,
            type: activity.type,
            groupId: activity.group._ref ?? null
          }}
        />
      </ArticleContent>
    </Article>
  );
};

export default Page;
