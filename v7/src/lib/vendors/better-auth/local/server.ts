import { Pool } from "pg";
import { createBetterAuthServerInstance } from "../../../../../packages/auth/better-auth";

export const localServerAuth = createBetterAuthServerInstance("local", {
  database: new Pool({
    connectionString:
      "postgresql://postgres.ddgevazvjzypknifulwg:HgViukXG7JCJtdD9@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
  }),
  emailAndPassword: { enabled: true }
});
