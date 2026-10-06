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

import Footer from "@/components/ui/Footer/Footer";
import { SEO } from "@/lib/constants/static";
import type { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
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
  { name: "Startpagina", href: "/", icon: "home-5-line" },
  { name: "Haegeprekerke", href: "/haegeprekerke", icon: "book-3-line" },
  { name: "Nieuws & blog", href: "/blog", icon: "newspaper-line" },
  { name: "Leiding", href: "/leiding", icon: "team-line" },

  { name: "HP Rénove", href: "/vzw", icon: "hammer-line" },
  { name: "Contact", href: "/contact", icon: "chat-4-line" }
] satisfies RootNavigationItemProps[];

const MENU_END = [
  { name: "Digitale lidkaart", href: "/ga/lidkaart", icon: "qr-code-line" }
] satisfies RootNavigationItemProps[];

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  authMemory.initalize();

  const isAuthenticated = authMemory.isAuthenticated;
  const signinContext = authMemory.signinContext;
  const session = authMemory.session;

  return (
    <html
      lang="nl"
      className={cn(
        sora.variable,
        podkova.variable,
        "h-full antialiased [interpolate-size:allow-keywords]"
      )}
    >
      <body className="min-h-full flex flex-col h-full pl-(--rootnavigation-size-min)">
        <RootNavigation
          itemsStart={MENU_START}
          itemsEnd={MENU_END}
          className=" "
        />
        <ul className="">
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
