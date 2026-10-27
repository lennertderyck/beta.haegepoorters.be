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
  return (
    <Boundary asChild>
      <div className="mt-auto">
        <footer className="mt-12" {...otherProps}>
          <BoundaryInline>
            <FooterSocialLinks className="mb-4" />
          </BoundaryInline>
          <div className="bg-gray-100 py-8">
            <BoundaryInline>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 grid gap-4 grid-cols-6 *:col-span-12 lg:*:col-span-3">
                  {FOOTER_CONTACT_CARDS.map((card, cardIndex) => (
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
                <div className="col-span-12 md:col-span-6 flex md:flex-row-reverse items-center md:items-end gap-4">
                  <Image
                    src={LOGO_SGV}
                    alt="my icon"
                    className="h-20 md:h-28 w-fit"
                  />
                  <p className="text-left md:text-right flex-1">
                    <span className="max-w-100 inline-block text-balance text-sm">
                      Als groep maken we deel uit van District Gent-Oost, binnen
                      Gouw Gent en de structuren van Scouts en Gidsen
                      Vlaanderen.
                    </span>
                  </p>
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
