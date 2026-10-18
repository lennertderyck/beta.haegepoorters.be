import { keycloakServerAuth } from "@/lib/vendors/better-auth/keycloak/server";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(keycloakServerAuth);
