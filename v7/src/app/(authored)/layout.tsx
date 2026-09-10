import Auth from "@/lib/modules/Auth/Auth";
import { FC } from "react";

const Layout: FC<LayoutProps<"/">> = async ({ children }) => {
  const session = await Auth.session;

  return (
    <>
      {session ? JSON.stringify(session) : "no session"}
      <main className="py-12 lg:py-24">{children}</main>
    </>
  );
};

export default Layout;
