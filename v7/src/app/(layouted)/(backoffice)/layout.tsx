import Boundary, { BoundaryBlock } from "@/components/basics/Boundary/Boundary";
import { createAuth } from "@/lib/modules/Auth";
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { FC } from "react";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const Layout: FC<LayoutProps<"/">> = async ({ children }) => {
  const auth = await createAuth();
  const isAuthenticated = auth.isAuthenticated;
  const hasCapabilities =
    isAuthenticated && auth.capabilities.includes("webmaster");

  if (!hasCapabilities) unauthorized();
  return (
    <Boundary>
      <BoundaryBlock>{children}</BoundaryBlock>
    </Boundary>
  );
};

export default Layout;
