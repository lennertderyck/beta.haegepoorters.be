import type { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { FC } from "react";

export const metadata: Metadata = { robots: { index: false, follow: false } };

import { createAuth } from "@/lib/modules/Auth";
const Layout: FC<LayoutProps<"/ga">> = async ({ children }) => {
  const auth = await createAuth();
  const isAuthenticated = auth.isAuthenticated;
  const hasCapabilities = isAuthenticated && auth.capabilities.length > 0;

  if (!hasCapabilities) unauthorized();
  return children;
};

export default Layout;
