import Article, {
  ArticleContent,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleTitle,
} from "@/components/basics/Article/Article";
import ActivityForm, {
  ActivityFormSubmitState,
} from "@/components/ui/ActivityForm/ActivityForm";
import {
  activityInputSchema,
  getActivityById,
  updateActivityMutation,
} from "@/lib/actions/queries/activities";
import { requireCapability } from "@/lib/auth/guards";
import { redirect } from "next/navigation";
import { FC } from "react";
import ActivityDeleteButton from "./ActivityDeleteButton";

const Page: FC<
  PageProps<"/haegeprekerke/editor/[group]/[activity]/bewerken">
> = async ({ params }) => {
  const { activity: activityParam, group } = await params;
  const activity = await getActivityById(activityParam);

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
      `/haegeprekerke/editor/${group}?status=success&activiteit=${activityParam}`,
    );
  };

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer className="flex flex-wrap gap-4 justify-between">
          <ArticleTitle>Activiteit bewerken</ArticleTitle>
          <ActivityDeleteButton
            activityId={activityParam}
            redirectUrl={`/haegeprekerke/editor/${group}?status=success`}
          />
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <ActivityForm
          action={updateActivity}
          actionType="update"
          defaultValue={{
            title: activity.title,
            startDate: activity.startDate,
            endDate: activity.endDate,
            body: activity.body,
            type: activity.type,
          }}
        />
      </ArticleContent>
    </Article>
  );
};

export default Page;
