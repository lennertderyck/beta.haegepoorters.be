import { LOGO_SGV } from "@/assets";
import Boundary, {
  BoundaryInline
} from "@/components/basics/Boundary/Boundary";
import Button from "@/components/basics/Button/Button";
import Card, {
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle
} from "@/components/basics/Card/Card";
import Icon from "@/components/basics/Icon/Icon";
import { getGroupInformationQuery } from "@/lib/actions/queries/group";
import { FOOTER_CONTACT_CARDS } from "@/lib/constants/static";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, FC, Fragment } from "react";
import FooterColophon from "./FooterColophon";
import FooterSocialLinks from "./FooterSocialLinks";

interface Props {}

const Footer: FC<ComponentProps<"footer">> = async ({
  className,
  ...otherProps
}) => {
  const groupResponse = await getGroupInformationQuery();
  const groupData = await groupResponse.json();

  const groupAddress = groupData.adressen.find(
    (address) => address.postadres === true
  );

  const UPDATED_CONTACT_CARDS = FOOTER_CONTACT_CARDS.map((card) => ({
    ...card,
    address:
      card.key === "group" && groupAddress
        ? [
            `${groupAddress.straat} ${groupAddress.nummer}`,
            `${groupAddress.postcode} ${groupAddress.gemeente}`
          ]
        : null
  }));

  return (
    <Boundary asChild>
      <div className="mt-auto">
        <footer className="mt-12" {...otherProps}>
          <BoundaryInline>
            <FooterSocialLinks className="mb-4" />
          </BoundaryInline>
          <div className="bg-gray-100 py-8">
            <BoundaryInline>
              <div className="grid grid-cols-12">
                <div className="col-span-6 grid gap-4 grid-cols-6 *:col-span-12 lg:*:col-span-3">
                  {UPDATED_CONTACT_CARDS.map((card, cardIndex) => (
                    <div key={cardIndex}>
                      <Card sizing="compact" variant="inline">
                        <>
                          <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                            {card.description && (
                              <CardSubtitle>{card.description}</CardSubtitle>
                            )}
                            {card.address && card.address.length > 0 && (
                              <CardSubtitle asChild>
                                <address className="not-italic leading-normal text-base! font-sans!">
                                  {card.address.map(
                                    (addressLine, adressLineIndex) => (
                                      <Fragment key={adressLineIndex}>
                                        {addressLine}
                                        <br />
                                      </Fragment>
                                    )
                                  )}
                                </address>
                              </CardSubtitle>
                            )}
                          </CardHeader>
                          <CardFooter>
                            <Button asChild variant="tertiary">
                              <Link href={card.buttonHref}>
                                {card.buttonLabel}{" "}
                                <Icon name="arrow-right-line" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </>
                      </Card>
                    </div>
                  ))}
                </div>
                <div className="col-span-6 flex items-end gap-4">
                  <p className="text-right flex-1">
                    {/* <span className="max-w-100 inline-block">
                    Wij zijn deel van Scouts en Gidsen Vlaanderen. Een
                    koepelorganisatie die scoutsgroepen ondersteunt en
                    begeleidt.
                  </span> */}
                    <span className="max-w-100 inline-block text-balance text-sm">
                      Als groep maken we deel uit van District Gent-Oost, binnen
                      Gouw Gent en de structuren van Scouts en Gidsen
                      Vlaanderen.
                    </span>
                  </p>
                  <Image src={LOGO_SGV} alt="my icon" className="h-28 w-fit" />
                </div>
              </div>
              <FooterColophon />
            </BoundaryInline>
          </div>
        </footer>
      </div>
    </Boundary>
  );
};

export default Footer;
