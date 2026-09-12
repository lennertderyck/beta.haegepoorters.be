import { ADMIN_API_BASE_URL } from "@/lib/constants/admin";
import Auth from "@/lib/modules/Auth/Auth";
import CreateQueryFactory from "../../../../packages/fetch/query";

export { ADMIN_API_BASE_URL };

export const AdminQueryFactory = CreateQueryFactory(
  async () => {
    const accessToken = await Auth.accessToken;

    return new Request(ADMIN_API_BASE_URL, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : ""
      }
    });
  },
  {
    enable: () => Auth.isAuthenticated
  }
);
