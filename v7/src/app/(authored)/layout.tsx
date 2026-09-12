import { FC } from "react";

const Layout: FC<LayoutProps<"/">> = async ({ children }) => {
  return (
    <>
      <main className="py-12 lg:py-24">{children}</main>
    </>
  );
};

export default Layout;
