import { localServerAuth } from "@/lib/vendors/better-auth/local/server";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(localServerAuth);
