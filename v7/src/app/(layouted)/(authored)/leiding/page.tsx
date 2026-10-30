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
    CardFooter,
    CardHeader,
    CardsGroup,
    CardSubtitle,
    CardTitle
} from "@/components/basics/Card/Card";
import Icon from "@/components/basics/Icon/Icon";
import Notice from "@/components/basics/Notice/Notice";
import { getStaffPerAgeGroup } from "@/lib/actions/queries/staff";
import { staffRoleComparator } from "@/lib/utils/comparators";
import { composeImageSourceSet } from "@/lib/utils/composers";
import SanityImage from "@/lib/vendors/sanity/images";
import type { Metadata } from "next";
import { FC } from "react";
import StaffContactModalButton from "./StaffContactModalButton";

export const metadata: Metadata = {
  title: "Leiding",
  description:
    "Maak kennis met het team van gemotiveerde leiding van Scouts & Gidsen Haegepoorters Destelbergen.",
  alternates: { canonical: "/leiding" }
};

const SRC_SET_SIZES = [100, 200, 400, 800];
const SRC_FALLBACK = "https://singlecolorimage.com/get/d6d6d6/100x100";

interface Props {}

const Page: FC<Props> = async () => {
  const groupedStaff = await getStaffPerAgeGroup();

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
        {groupedStaff.map((group) => (
          <ul key={group._id} className="mb-12">
            <li>
              <h2 className="font-serif capitalize font-bold text-3xl mb-3">
                {group.name}
              </h2>
              {group.staff.length === 0 && (
                <Notice>
                  De leiding voor deze groep is nog niet opgegeven.
                </Notice>
              )}
              {group.staff.length > 0 && (
                <CardsGroup variant="grid" sizing="compact">
                  {group.staff.sort(staffRoleComparator).map((member) => (
                    <Card key={member._id} sizing="compact">
                      <CardContent>
                        <CardFigure sizing="hugge">
                          <img
                            src={
                              member.cover
                                ? SanityImage.fromSource(member.cover)
                                    .width(800)
                                    .auto("format")
                                    .url()
                                : SRC_FALLBACK
                            }
                            srcSet={
                              member.cover
                                ? composeImageSourceSet(
                                    SRC_SET_SIZES.map((size) => [
                                      size,
                                      SanityImage.fromSource(member.cover!)
                                        .width(size)
                                        .auto("format")
                                        .url()
                                    ])
                                  )
                                : undefined
                            }
                            alt={`Foto van ${member.firstName} ${member.lastName}`}
                            loading="lazy"
                          />
                        </CardFigure>

                        <CardHeader>
                          <CardTitle>
                            {member.firstName} {member.lastName}
                          </CardTitle>
                          <CardSubtitle>
                            {member.secondaryName ?? ""}
                          </CardSubtitle>
                        </CardHeader>
                        {member.phoneNumber && (
                          <CardFooter>
                            <StaffContactModalButton
                              staffMember={member}
                              variant="tertiary"
                            >
                              {member.firstName} contacteren
                              <Icon name="arrow-right-up-line" />
                            </StaffContactModalButton>
                          </CardFooter>
                        )}
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
