import Boundary, {
  BoundaryContainer
} from "@/components/basics/Boundary/Boundary";
import { FC } from "react";

const Layout: FC<LayoutProps<"/">> = async ({ children }) => {
  return (
    <Boundary>
      <BoundaryContainer>{children}</BoundaryContainer>
    </Boundary>
  );
};

export default Layout;
