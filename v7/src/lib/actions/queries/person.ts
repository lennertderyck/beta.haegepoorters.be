import { AdminQueryFactory } from "../factories";

export const getProfileQuery = AdminQueryFactory(
  "/profile",
  {} as Record<string, string>
);
