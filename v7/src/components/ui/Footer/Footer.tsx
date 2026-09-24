import { LOGO_SGV } from "@/assets";
import Boundary, {
    BoundaryContent
} from "@/components/basics/Boundary/Boundary";
import Button from "@/components/basics/Button/Button";
import Card, {
    CardContent,
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

interface Props {}

const Footer: FC<ComponentProps<"footer">> = ({ className, ...otherProps }) => {
  return (
    <Boundary>
      <footer className="mt-auto" {...otherProps}>
        <div className="bg-gray-100 py-8 mt-12">
          <BoundaryContent>
            <div className="grid grid-cols-12">
              <div className="col-span-6 grid gap-4 grid-cols-6 *:col-span-12 lg:*:col-span-3">
                {FOOTER_CONTACT_CARDS.map((card, cardIndex) => (
                  <div key={cardIndex}>
                    <Card sizing="compact" variant="inline">
                      <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                        {card.description && (
                          <CardSubtitle>{card.description}</CardSubtitle>
                        )}
                      </CardHeader>
                      {card.address && card.address.length > 0 && (
                        <CardContent asChild>
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
                        </CardContent>
                      )}
                      <CardFooter>
                        <Button asChild variant="tertiary">
                          <Link href={card.buttonHref}>
                            {card.buttonLabel} <Icon name="arrow-right-line" />
                          </Link>
                        </Button>
                      </CardFooter>
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
                    Gouw Gent en de structuren van Scouts en Gidsen Vlaanderen.
                  </span>
                </p>
                <Image src={LOGO_SGV} alt="my icon" className="h-32 w-fit" />
              </div>
            </div>
            <FooterColophon />
          </BoundaryContent>
        </div>
      </footer>
    </Boundary>
  );
};

export default Footer;
