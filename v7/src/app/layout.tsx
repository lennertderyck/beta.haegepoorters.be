import RootNavigation from "@/components/ui/RootNavigation/RootNavigation";
import { RootNavigationItemProps } from "@/components/ui/RootNavigation/RootNavigation.types";
import { podkova, sora } from "@/lib/fonts";
import { authMemory } from "@/lib/initializer";
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
import { SEO } from "@/lib/constants/static";
import type { Metadata } from "next";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import { SigninContext } from "../../packages/auth/AuthMemory";
import "./globals.css";

dayjs.locale("nl");

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

export const metadata: Metadata = {
  title: SEO.name.short,
  description: SEO.name.official
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

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  authMemory.initalize();

  const isAuthenticated = authMemory.isAuthenticated;
  const signinContext = authMemory.signinContext;
  const session = authMemory.session;

  const name = session?.user?.name || "Aanmelden";

  const signContextLabelMap: Record<NonNullable<SigninContext>, string> = {
    local: "Lokaal beheer"
  };

  const signContextLabel =
    signContextLabelMap[
      authMemory.signinContext as NonNullable<SigninContext>
    ] || "Groepsadministratie";

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
        <ul className="hidden">
          <li>{`isAuthenticated: ${isAuthenticated ? "Yes" : "No"}`}</li>
          <li>{`signinContext: ${signinContext}`}</li>
          <li>{`session: ${session ? "Has session" : "no session"}`}</li>
          <li>{`capabilities: ${authMemory.capabilities.length > 0 ? authMemory.capabilities.join(", ") : "N/A"}`}</li>
          <li>
            Expires at:{" "}
            {authMemory.session?.session.expiresAt
              ? dayjs(authMemory.session?.session.expiresAt).format() +
                " of " +
                dayjs(authMemory.session?.session.expiresAt).fromNow()
              : "N/A"}
          </li>
        </ul>
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
