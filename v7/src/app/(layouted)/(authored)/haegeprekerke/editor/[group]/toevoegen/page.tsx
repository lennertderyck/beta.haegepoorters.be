import Article, {
  ArticleContent,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleTitle,
} from "@/components/basics/Article/Article";
import ActivityForm, {
  ActivityFormState,
} from "@/components/ui/ActivityForm/ActivityForm";
import {
  activityInputSchema,
  createActivityMutation,
} from "@/lib/actions/queries/activities";
import { getGroupByAbbr } from "@/lib/actions/queries/groups";
import { requireCapability } from "@/lib/auth/guards";
import { redirect } from "next/navigation";
import { FC } from "react";

const Page: FC<PageProps<"/haegeprekerke/editor/[group]/toevoegen">> = async ({
  params,
}) => {
  const { group: groupAbbr } = await params;

  const groupResponse = await getGroupByAbbr(groupAbbr);

  const createActivity = async (reaction: ActivityFormState) => {
    "use server";

    await requireCapability("leader", "webmaster");
    const input = activityInputSchema.parse({
      ...reaction,
      type: reaction.type || "default",
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
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Activiteit toevoegen</ArticleTitle>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <ActivityForm action={createActivity} actionType="create" />
      </ArticleContent>
    </Article>
  );
};

export default Page;
