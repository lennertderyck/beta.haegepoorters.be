import Article, {
    ArticleContent,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import ActivityForm, {
    ActivityFormState
} from "@/components/ui/ActivityForm/ActivityForm";
import { createActivityMutation } from "@/lib/actions/queries/activities";
import { getGroupByAbbr } from "@/lib/actions/queries/groups";
import { redirect } from "next/navigation";
import { FC } from "react";

const Page: FC<PageProps<"/haegeprekerke/editor/[group]/toevoegen">> = async ({
  params
}) => {
  const { group: groupAbbr } = await params;

  const groupResponse = await getGroupByAbbr(groupAbbr);

  const createActivity = async (reaction: ActivityFormState) => {
    "use server";

    console.log({ reaction });

    try {
      const response = await createActivityMutation({
        groupId: groupResponse._id,
        startDate: reaction.startDate,
        endDate: reaction.endDate,
        title: reaction.title,
        body: reaction.body,
        type: reaction.type || "default"
      });
      console.log({ response });
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
