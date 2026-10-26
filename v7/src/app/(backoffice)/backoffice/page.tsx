import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Button from "@/components/basics/Button/Button";
import Card, {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardsGroup,
    CardTitle
} from "@/components/basics/Card/Card";
import Icon from "@/components/basics/Icon/Icon";
import Link from "next/link";
import { FC } from "react";

const ITEMS = [
  {
    title: "Passkeys",
    description: "Meld je aan zonder wachtwoord",
    href: "/backoffice/passkeys",
    hrefLabel: "Beheer passkeys"
  },
  {
    title: "Uitnodigingen",
    description: "Meld je aan met een uitnodigingslink",
    href: "/backoffice/invites",
    hrefLabel: "Beheer uitnodigingen"
  },
  {
    title: "Configuratie",
    description: "Beheer de instellingen van de website",
    href: "/backoffice/configuratie",
    hrefLabel: "Openen"
  },
  {
    title: "Leiding importeren",
    description: "Importeer de leidingsverdeling uit de Groepsadministratie",
    href: "/backoffice/leiding/importeren",
    hrefLabel: "Nieuwe import starten"
  }
];

interface Props {}

const Page: FC<Props> = () => {
  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Backoffice</ArticleTitle>
          <ArticleDescription>Beheer van de website.</ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent className="flex flex-wrap gap-3">
        <CardsGroup>
          {ITEMS.map((item, itemIndex) => (
            <Link key={itemIndex} href={item.href}>
              <Card>
                <CardContent>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardDescription>{item.description}</CardDescription>
                  <CardFooter>
                    <Button variant="tertiary">
                      {item.hrefLabel}
                      <Icon name="arrow-right-line" />
                    </Button>
                  </CardFooter>
                </CardContent>
              </Card>
            </Link>
          ))}
        </CardsGroup>
        {/* <Button asChild variant="secondary">
          <Link href="/backoffice/passkeys">
            Passkeys beheren
            <Icon name="arrow-right-line" />
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/backoffice/invites">
            Uitnodigingen
            <Icon name="arrow-right-line" />
          </Link>
        </Button> */}
      </ArticleContent>
    </Article>
  );
};

export default Page;
