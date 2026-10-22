import { createClient } from "@supabase/supabase-js";

/**
 * Service role client, bypasses RLS. Only import from server actions and
 * route handlers, never from client components
 */
export const createSupabaseAdminClient = () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase admin environment variables");
  }

  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
};
