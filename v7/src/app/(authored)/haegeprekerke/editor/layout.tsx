import Auth from "@/lib/modules/Auth/Auth";
import { unauthorized } from "next/navigation";
import { FC } from "react";

const Layout: FC<LayoutProps<"/haegeprekerke/editor">> = async ({
  children
}) => {
  const isAuthenticated = await Auth.isAuthenticated;
  const hasCapabilities = isAuthenticated && (await Auth.capabilities).leader;

  if (!hasCapabilities) unauthorized();
  return children;
};

export default Layout;
