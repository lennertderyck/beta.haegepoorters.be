import { ADMIN_API_BASE_URL } from "@/lib/constants/admin";
import { authMemory } from "@/lib/initializer";
import CreateQueryFactory from "../../../../packages/fetch/query";

export { ADMIN_API_BASE_URL };

export const AdminQueryFactory = CreateQueryFactory(
  () => {
    const accessToken = authMemory.accessToken;

    return new Request(ADMIN_API_BASE_URL, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json"
      }
    });
  },
  {
    enable: () => authMemory.isAuthenticated
  }
);
