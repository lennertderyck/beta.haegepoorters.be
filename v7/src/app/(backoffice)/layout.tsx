import Boundary, { BoundaryBlock } from "@/components/basics/Boundary/Boundary";
import { FC } from "react";

const Layout: FC<LayoutProps<"/">> = ({ children }) => {
  return (
    <Boundary>
      <BoundaryBlock>{children}</BoundaryBlock>
    </Boundary>
  );
};

export default Layout;
