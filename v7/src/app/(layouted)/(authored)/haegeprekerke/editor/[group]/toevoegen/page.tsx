import Article, {
    ArticleContent,
    ArticleHeader,
    ArticleHeaderContent,
    ArticleTitle
} from "@/components/basics/Article/Article";
import ActivityForm, {
    ActivityFormState,
    initialActivityFormState
} from "@/components/ui/ActivityForm/ActivityForm";
import { requireCapability } from "@/lib/auth/guards";
import {
    activityInputSchema,
    createActivityMutation,
    getActivityGroupByIdentifier
} from "@/lib/server/queries/activities";
import { redirect } from "next/navigation";
import { FC } from "react";

const Page: FC<PageProps<"/haegeprekerke/editor/[group]/toevoegen">> = async ({
  params
}) => {
  const { group: groupAbbr } = await params;

  const [groupResponse] = await Promise.all([
    getActivityGroupByIdentifier(groupAbbr)
  ]);

  const createActivity = async (reaction: ActivityFormState) => {
    "use server";

    await requireCapability("leader", "webmaster");
    const input = activityInputSchema.parse({
      ...reaction,
      type: reaction.type || "default"
    });

    try {
      await createActivityMutation({ ...input, groupId: groupResponse._id });
    } catch (error) {
      console.error(error);
    }

    redirect(`/haegeprekerke/editor/${groupAbbr}?status=success`);
  };

  return (
    <Article>
      <ArticleHeaderContent>
        <ArticleHeader>
          <ArticleTitle>Activiteit toevoegen</ArticleTitle>
        </ArticleHeader>
      </ArticleHeaderContent>
      <ArticleContent>
        <ActivityForm
          action={createActivity}
          intent="create"
          defaultValue={{
            ...initialActivityFormState,
            groupId: groupResponse._id ?? null
          }}
        />
      </ArticleContent>
    </Article>
  );
};

export default Page;
