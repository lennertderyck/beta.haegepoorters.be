import Button from "@/components/basics/Button/Button";
import Card, {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/basics/Card/Card";
import Icon from "@/components/basics/Icon/Icon";
import Label from "@/components/basics/Label/Label";
import {
    Section,
    SectionHeader,
    SectionTitle
} from "@/components/basics/Section/Section";
import { getTrooperCommissionStatus } from "@/lib/vendors/trooper";
import Link from "next/link";
import { ComponentProps, FC } from "react";

const TrooperProgressBanner: FC<ComponentProps<typeof Section>> = async (
  props
) => {
  const trooperCommissionStatus = await getTrooperCommissionStatus();

  return (
    <Section {...props}>
      <SectionHeader>
        <SectionTitle>Steun onze werking via Trooper!</SectionTitle>
      </SectionHeader>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src="https://www.trooper.be/images/trooper-logo.svg"
            alt="Trooper logo"
            className="h-8 w-auto"
          />
          <div>
            <Card sizing="compact" variant="inline">
              <CardContent>
                <CardHeader className="mb-0">
                  <CardTitle>Jij shopt en wij verdienen mee</CardTitle>
                  <CardDescription>
                    Wist je dat je via Trooper onze werking kan steunen wanneer
                    je online iets koopt?
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="tertiary" asChild>
                    <Link
                      href="https://www.trooper.be/nl/trooperverenigingen/hp"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Trooper mee! <Icon name="arrow-right-up-line" />
                    </Link>
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <Label asChild className="mb-1">
            <p className="text-right">
              <span>{Math.round(trooperCommissionStatus.earned)}€</span>

              <span className="text-neutral-400">
                {" / "}
                {Math.round(trooperCommissionStatus.target)}€
              </span>
            </p>
          </Label>
          <div className="bg-amber-500 w-60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-700 h-[inherit]"
              style={{ width: trooperCommissionStatus.percentage + "%" }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TrooperProgressBanner;
