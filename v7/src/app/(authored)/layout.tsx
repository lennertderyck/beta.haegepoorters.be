import Boundary, {
    BoundaryBlock,
    BoundaryInline
} from "@/components/basics/Boundary/Boundary";
import { FC } from "react";

const Layout: FC<LayoutProps<"/">> = async ({ children }) => {
  return (
    <Boundary>
      <BoundaryBlock>
        <BoundaryInline>{children}</BoundaryInline>
      </BoundaryBlock>
    </Boundary>
  );
};

export default Layout;
