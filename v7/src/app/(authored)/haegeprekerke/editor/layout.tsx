import { authMemory } from "@/lib/initializer";
import { unauthorized } from "next/navigation";
import { FC } from "react";

const Layout: FC<LayoutProps<"/haegeprekerke/editor">> = async ({
  children
}) => {
  const isAuthenticated = authMemory.isAuthenticated;
  const hasCapabilities =
    isAuthenticated &&
    (authMemory.capabilities.includes("leader") ||
      authMemory.capabilities.includes("webmaster"));

  if (!hasCapabilities) unauthorized();
  return children;
};

export default Layout;
