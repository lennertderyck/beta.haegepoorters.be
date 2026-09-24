// Static content on the site. To be replace with dynamic content from CMS or other solutions. */

import dayjs from "dayjs";

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
];

export const FOOTER_CONTACT_CARDS = [
  {
    title: "Scouts & Gidsen Haegepoorters",
    address: ["Bijlokestraat 18", "9070 Destelbergen"],
    buttonHref: "/contact",
    buttonLabel: "Contacteer groepsleiding"
  },
  {
    title: "HP Rénové VZW",
    description: "Staat in voor het beheer van onze lokalen.",
    buttonHref: "/vzw",
    buttonLabel: "Contacteer VZW"
  }
];

export const COLOPHON = [
  [
    {
      text: `© 2007 - ${dayjs().format("YYYY")} Scouts & Gidsen Haegepoorters Destelbergen`
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
];
