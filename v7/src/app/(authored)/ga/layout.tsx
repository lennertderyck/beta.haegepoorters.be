import { authMemory } from "@/lib/initializer";
import { keycloakServerAuth } from "@/lib/vendors/better-auth/keycloak/server";
import { unauthorized } from "next/navigation";
import { FC } from "react";

import { headers as nextHeaders } from "next/headers";
const Layout: FC<LayoutProps<"/ga">> = async ({ children }) => {
  const headers = await nextHeaders();
  const d = await keycloakServerAuth.api.getSession({
    headers
  });

  console.log({ d });

  const isAuthenticated = authMemory.isAuthenticated;
  const hasCapabilities = isAuthenticated;

  if (!hasCapabilities) unauthorized();
  return children;
};

export default Layout;
