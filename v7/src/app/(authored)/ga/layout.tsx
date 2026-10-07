import { authMemory } from "@/lib/initializer";
import { unauthorized } from "next/navigation";
import { FC } from "react";

const Layout: FC<LayoutProps<"/ga">> = ({ children }) => {
  const isAuthenticated = authMemory.isAuthenticated;
  const hasCapabilities = isAuthenticated;

  if (!hasCapabilities) unauthorized();
  return children;
};

export default Layout;
