// Static content on the site. To be replace with dynamic content from CMS or other solutions. */

import { IconName } from "@/components/basics/Icon/Icon";
import dayjs from "dayjs";

export const SEO = {
  name: {
    short: "Haegepoorters",
    variant: "Haegepoorters Destelbergen",
    long: "Scouts & Gidsen Haegepoorters",
    official: "Scouts & Gidsen Haegepoorters Destelbergen"
  },
  about: `Deel uitmaken van onze scouts is meer dan een hobby. De
    Haegepoorters, ook wel "HP" in de volksmond, zijn een thuis voor
    meer dan 200 jongeren.`
};

export const STARTPAGE_ADDITIONAL_INFO_CARDS = [
  {
    title: "Groepsadministratie",
    content: "Beheer de persoonlijke gegevens van je kind(eren)",
    buttonHref: "/groepsadministratie",
    buttonLabel: "Aanmelden"
  },
  {
    title: "De Scoutsshop (Hopper)",
    content:
      "Koop al je uitrusting bij De Scoutsshop en geniet een mooie korting als lid",
    buttonHref: "https://www.hopper.be/shop",
    buttonLabel: "Naar De Scoutsshop"
  },
  {
    title: "Scouts en Gidsen Vlaanderen",
    content:
      "De overkoepelende organisatie (het Verbond) waar onze scouts bij hoort",
    buttonHref: "https://www.scoutsengidsenvlaanderen.be",
    buttonLabel: "Meer weten"
  },
  {
    title: "Trooper",
    content: "Steun gratis onze scouts met je online aankopen",
    buttonHref: "https://www.trooper.be/nl/trooperverenigingen/hp",
    buttonLabel: "Steun ons"
  }
] satisfies {
  title: string;
  content: string;
  buttonHref: string;
  buttonLabel: string;
}[];

export const FOOTER_CONTACT_CARDS = [
  {
    key: "group",
    title: "Scouts & Gidsen Haegepoorters",
    address: null,
    buttonHref: "/contact",
    buttonLabel: "Contacteer groepsleiding"
  },
  {
    key: "vzw",
    title: "HP Rénové VZW",
    description: "Staat in voor het beheer van onze lokalen.",
    buttonHref: "/vzw",
    buttonLabel: "Contacteer VZW"
  }
] satisfies {
  key: string;
  title: string;
  address?: string[] | null;
  description?: string;
  buttonHref: string;
  buttonLabel: string;
}[];

export const FOLLOW_LINKS = [
  {
    name: "Messenger",
    href: "",
    icon: "messenger-line"
  },
  {
    name: "Facebook",
    href: "",
    icon: "facebook-circle-line"
  },
  {
    name: "Instagram",
    href: "",
    icon: "instagram-line"
  }
] satisfies { name: string; href: string; icon: IconName }[];

export const COLOPHON = [
  [
    {
      text: `© 2007 - ${dayjs().format("YYYY")} ${SEO.name.official}`
    },
    {
      text: "Ontwikkeld door JUNG • Gent",
      href: "https://www.jung.gent"
    },
    {
      text: "Aanmelden als webmaster",
      href: "/webmaster"
    }
  ],
  [
    {
      text: "Privacy & cookiebeleid",
      href: "/privacy"
    }
  ]
] satisfies { text: string; href?: string }[][];
