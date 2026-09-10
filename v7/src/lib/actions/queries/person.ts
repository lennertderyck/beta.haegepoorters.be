import { AdminQueryFactory } from "../factories";

export const getProfileQuery = AdminQueryFactory(
  "/profile",
  new URLSearchParams()
);
