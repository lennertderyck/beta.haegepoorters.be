import { unauthorized } from "next/navigation";
import { FC } from "react";

import { createAuth } from "@/lib/modules/Auth";
const Layout: FC<LayoutProps<"/ga">> = async ({ children }) => {
  const auth = await createAuth();
  const isAuthenticated = auth.isAuthenticated;
  const hasCapabilities = isAuthenticated && auth.capabilities.length > 0;

  console.log({ auth });

  if (!hasCapabilities) unauthorized();
  return children;
};

export default Layout;
