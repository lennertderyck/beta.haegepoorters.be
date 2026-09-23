import Boundary, {
    BoundaryContent
} from "@/components/basics/Boundary/Boundary";
import { FC } from "react";

const Layout: FC<LayoutProps<"/">> = ({ children }) => {
  return (
    <Boundary>
      <BoundaryContent>{children}</BoundaryContent>
    </Boundary>
  );
};

export default Layout;
