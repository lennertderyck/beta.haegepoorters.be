import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Card, {
    CardContent,
    CardFigure,
    CardHeader,
    CardsGroup,
    CardTitle
} from "@/components/basics/Card/Card";
import { getStaffPerGroup } from "@/lib/actions/queries/staff";
import { FC } from "react";

interface Props {}

const Page: FC<Props> = async () => {
  const d = await getStaffPerGroup();

  console.log(d);

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Leiding</ArticleTitle>
          <ArticleDescription>
            Ons team van gemotiveerde leiding
          </ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent stretch>
        {d.map((group) => (
          <ul key={group._id} className="mb-6">
            <li>
              <h2 className="font-serif capitalize font-bold text-3xl mb-3">
                {group.name}
              </h2>
              {group.staff.length > 0 && (
                <CardsGroup variant="grid" sizing="compact">
                  {group.staff.map((member: any) => (
                    <Card key={member._id}>
                      <CardContent>
                        <CardFigure sizing="hugge">
                          <img
                            src={
                              member.coverUrl ??
                              "https://singlecolorimage.com/get/d6d6d6/100x100"
                            }
                            alt=""
                          />
                        </CardFigure>
                        <CardHeader>
                          <CardTitle>
                            {member.firstName} {member.lastName}
                          </CardTitle>
                        </CardHeader>
                      </CardContent>
                    </Card>
                  ))}
                </CardsGroup>
              )}
            </li>
          </ul>
        ))}
      </ArticleContent>
    </Article>
  );
};

export default Page;
