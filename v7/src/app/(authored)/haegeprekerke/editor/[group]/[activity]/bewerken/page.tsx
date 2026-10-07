import Article, {
    ArticleContent,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import ActivityForm, {
    ActivityFormSubmitState
} from "@/components/ui/ActivityForm/ActivityForm";
import {
    deleteActivityMutation,
    getActivityById,
    updateActivityMutation
} from "@/lib/actions/queries/activities";
import { redirect } from "next/navigation";
import { FC } from "react";

const Page: FC<
  PageProps<"/haegeprekerke/editor/[group]/[activity]/bewerken">
> = async ({ params }) => {
  const { activity: activityParam, group } = await params;
  const activity = await getActivityById(activityParam);

  const updateActivity = async (reaction: ActivityFormSubmitState) => {
    "use server";

    try {
      updateActivityMutation(activityParam, {
        title: reaction.title,
        startDate: reaction.startDate,
        endDate: reaction.endDate,
        body: reaction.body,
        type: reaction.type
      });
      console.log("Updating activity", { activity, reaction });
    } catch (error) {
      console.log({ error });
    }

    redirect(
      `/haegeprekerke/editor/${group}?status=success&activiteit=${activityParam}`
    );
  };

  const deleteActivity = async () => {
    "use server";

    try {
      // Implement the delete activity mutation here
      deleteActivityMutation(activityParam);
    } catch (error) {
      console.log({ error });
    }

    redirect(`/haegeprekerke/editor/${group}?status=success`);
  };

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Activiteit bewerken</ArticleTitle>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <ActivityForm
          action={updateActivity}
          deleteAction={deleteActivity}
          actionType="update"
          defaultValue={{
            title: activity.title,
            startDate: activity.startDate,
            endDate: activity.endDate,
            body: activity.body,
            type: activity.type
          }}
        />
      </ArticleContent>
    </Article>
  );
};

export default Page;
