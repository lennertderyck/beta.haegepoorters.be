import { RootNavigationItemProps } from "@/components/ui/RootNavigation/RootNavigation.types";
import { podkova, sora } from "@/lib/fonts";
import { cn } from "@/lib/utils/composers";
import dayjs from "dayjs";
import "dayjs/locale/nl";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";

import { FOLLOW_LINKS, SEO } from "@/lib/constants/static";
import { createAuth } from "@/lib/modules/Auth";
import type { Metadata, Viewport } from "next";
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
      {children}
    </html>
  );
};

export default RootLayout;
