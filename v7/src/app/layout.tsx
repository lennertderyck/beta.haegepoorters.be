import { podkova, sora } from "@/lib/fonts";
import { cn } from "@/lib/utils/composers";
import dayjs from "dayjs";
import "dayjs/locale/nl";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";

import { FOLLOW_LINKS, SEO } from "@/lib/constants/static";
import Feature from "@/lib/modules/Feature/Feature";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { FC, PropsWithChildren } from "react";
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

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  console.log(
    "Membership card feature flag:",
    await Feature.get("membership-card")
  );

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
      <Analytics />
    </html>
  );
};

export default RootLayout;
