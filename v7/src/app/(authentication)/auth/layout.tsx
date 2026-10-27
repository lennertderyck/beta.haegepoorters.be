import Boundary, {
  BoundaryBlock,
  BoundaryInline,
} from "@/components/basics/Boundary/Boundary";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = { robots: { index: false, follow: false } };

interface Props {}

const Layout: FC<LayoutProps<"/auth">> = ({ children }) => {
  return (
    <Boundary>
      <BoundaryBlock>
        <BoundaryInline>{children}</BoundaryInline>
      </BoundaryBlock>
    </Boundary>
  );
};

export default Layout;
