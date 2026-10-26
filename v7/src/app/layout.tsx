import RootNavigation from "@/components/ui/RootNavigation/RootNavigation";
import { RootNavigationItemProps } from "@/components/ui/RootNavigation/RootNavigation.types";
import { podkova, sora } from "@/lib/fonts";
import { cn } from "@/lib/utils/composers";
import dayjs from "dayjs";
import "dayjs/locale/nl";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";

import { LOGO_HAEGEPOORTERS_WHITE } from "@/assets";
import Icon from "@/components/basics/Icon/Icon";
import Label from "@/components/basics/Label/Label";
import Footer from "@/components/ui/Footer/Footer";
import RootNavigationMenu from "@/components/ui/RootNavigation/RootNavigationMenu";
import RootNavigationMenuLink from "@/components/ui/RootNavigation/RootNavigationMenuLink";
import RootNavigationMenuLinkContent from "@/components/ui/RootNavigation/RootNavigationMenuLinkContent";
import { FOLLOW_LINKS, SEO } from "@/lib/constants/static";
import { createAuth } from "@/lib/modules/Auth";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import { OAUTH_PROVIDERS } from "../../auth.config";
import { SigninContext } from "../../packages/auth/AuthMemory";
import "./globals.css";

dayjs.locale("nl");

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: {
    default: SEO.name.official,
    template: `%s | ${SEO.name.variant}`
  },
  description: SEO.description,
  applicationName: SEO.name.variant,
  keywords: [
    "scouts",
    "gidsen",
    "Destelbergen",
    "Haegepoorters",
    "jeugdbeweging",
    "Scouts en Gidsen Vlaanderen"
  ],
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: SEO.name.variant,
    title: SEO.name.official,
    description: SEO.description,
    images: [{ url: SEO.image, alt: SEO.name.official }]
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.name.official,
    description: SEO.description,
    images: [SEO.image]
  },
  formatDetection: { telephone: false, address: false, email: false }
};

export const viewport: Viewport = {
  themeColor: SEO.themeColor
};

/** Organization structured data for search engines */
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SEO.url}/#organization`,
  name: SEO.name.official,
  alternateName: [SEO.name.short, SEO.name.long, "HP"],
  url: SEO.url,
  logo: `${SEO.url}/icon.png`,
  image: SEO.image,
  description: SEO.description,
  email: SEO.email,
  sameAs: FOLLOW_LINKS.map((link) => link.href).filter(Boolean),
  parentOrganization: {
    "@type": "Organization",
    name: "Scouts en Gidsen Vlaanderen",
    url: "https://www.scoutsengidsenvlaanderen.be"
  }
};

const MENU_START = [
  { name: "Startpagina", href: "/", icon: "home-5-line", exact: true },
  {
    name: "Haegeprekerke",
    href: "/haegeprekerke",
    icon: "book-3-line",
    exact: false
  },
  {
    name: "Nieuws & blog",
    href: "/blog",
    icon: "newspaper-line",
    exact: false
  },
  { name: "Leiding", href: "/leiding", icon: "team-line", exact: false },

  { name: "HP Rénove", href: "/vzw", icon: "hammer-line", exact: false },
  { name: "Contact", href: "/contact", icon: "chat-4-line", exact: false }
] satisfies RootNavigationItemProps[];

const MENU_END = [
  {
    name: "Digitale lidkaart",
    href: "/ga/lidkaart",
    icon: "qr-code-line",
    exact: false
  }
] satisfies RootNavigationItemProps[];

const isAuthenticationHeaderEnabled =
  process.env.FEATURE_HEADER_AUTH_ENABLED === "true";

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const auth = await createAuth();

  const isAuthenticated = auth.isAuthenticated;
  const session = auth.session;
  const provider = auth.provider;
  const capabilities = auth.capabilities;
  const isMember = capabilities.includes("member");
  const expiresAt = auth.session?.session.expiresAt;
  const oauthProvider = OAUTH_PROVIDERS.find(
    (provider) => provider.config.providerId === auth.provider
  );

  const name = session?.user?.name || "Aanmelden";

  const signContextLabelMap: Record<NonNullable<SigninContext>, string> = {
    local: "Lokaal beheer"
  };

  const signContextLabel =
    signContextLabelMap[auth.provider as NonNullable<SigninContext>] ||
    "Groepsadministratie";

  return (
    <html
      lang="nl"
      className={cn(
        sora.variable,
        podkova.variable,
        "h-full antialiased [interpolate-size:allow-keywords]"
      )}
    >
      <body className="min-h-full flex flex-col h-full md:pl-(--rootnavigation-size-min)">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(/</g, "\\u003c")
          }}
        />
        <RootNavigation className="">
          <div className="flex">
            <div className="size-(--rootnavigation-size-min) bg-primary-500 p-2 grid place-items-center">
              <Image
                src={LOGO_HAEGEPOORTERS_WHITE}
                alt="Haegepoorters Logo"
                className="object-contain"
              />
            </div>
            <RootNavigationMenuLink
              href="/ga/profiel"
              className="flex items-center"
            >
              <RootNavigationMenuLinkContent className="flex-1">
                <div className="flex-1 flex items-center gap-5 px-5">
                  <div className="flex-1 flex flex-col items-end *:leading-4">
                    <div className="font-serif text-lg">{signContextLabel}</div>
                    <Label>{name}</Label>
                  </div>
                  <Icon name="account-circle-line" size="1.5rem" />
                </div>
              </RootNavigationMenuLinkContent>
            </RootNavigationMenuLink>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <RootNavigationMenu items={MENU_START} />
            <RootNavigationMenu items={MENU_END} />
          </div>
        </RootNavigation>
        {isAuthenticationHeaderEnabled && (
          <header className="px-5 py-3 bg-neutral-100 m-4">
            {!isAuthenticated && <p className="text-sm">Niet aangemeld</p>}
            {isAuthenticated && !isMember && (
              <p className="text-sm">
                Je bent aangemeld, maar geen lid van deze groep
              </p>
            )}
            {isMember && (
              <div className="flex items-center gap-4">
                <Icon name="checkbox-circle-line" className="inline-block" />
                <div>
                  <p className="font-serif font-semibold text-xl align-middle">
                    {oauthProvider?.info.description}
                  </p>
                  <p className="text-sm">
                    opnieuw om{" "}
                    {expiresAt &&
                      dayjs(expiresAt).format("DD MMM [om] HH:mm:ss") +
                        " of " +
                        dayjs(expiresAt).fromNow()}{" "}
                    ({capabilities.join(", ")})
                  </p>
                </div>
              </div>
            )}
          </header>
        )}
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
