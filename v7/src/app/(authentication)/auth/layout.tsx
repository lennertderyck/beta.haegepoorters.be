import Boundary, {
    BoundaryBlock,
    BoundaryInline
} from "@/components/basics/Boundary/Boundary";
import { FC } from "react";

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
