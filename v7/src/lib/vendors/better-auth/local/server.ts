import { Pool } from "pg";
import { createBetterAuthServerInstance } from "../../../../../packages/auth/better-auth";

const CONNECTION_STRING = process.env?.AUTH_LOCAL_CONNECTION_URI || "";

export const localServerAuth = createBetterAuthServerInstance("local", {
  database: new Pool({
    connectionString: CONNECTION_STRING
  }),
  emailAndPassword: { enabled: true }
});
