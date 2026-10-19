import { createAuth } from "@/lib/modules/Auth";
import { unauthorized } from "next/navigation";
import { FC } from "react";

const Layout: FC<LayoutProps<"/haegeprekerke/editor">> = async ({
  children
}) => {
  const auth = await createAuth();
  const isAuthenticated = auth.isAuthenticated;
  const hasCapabilities =
    isAuthenticated &&
    (auth.capabilities.includes("leader") ||
      auth.capabilities.includes("webmaster"));

  if (!hasCapabilities) unauthorized();
  return children;
};

export default Layout;
