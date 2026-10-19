import Boundary, { BoundaryBlock } from "@/components/basics/Boundary/Boundary";
import { createAuth } from "@/lib/modules/Auth";
import { unauthorized } from "next/navigation";
import { FC } from "react";

const Layout: FC<LayoutProps<"/">> = async ({ children }) => {
  const auth = await createAuth();
  const isAuthenticated = auth.isAuthenticated;
  const hasCapabilities = isAuthenticated && auth.capabilities.length > 0;

  if (!hasCapabilities) unauthorized();
  return (
    <Boundary>
      <BoundaryBlock>{children}</BoundaryBlock>
    </Boundary>
  );
};

export default Layout;
