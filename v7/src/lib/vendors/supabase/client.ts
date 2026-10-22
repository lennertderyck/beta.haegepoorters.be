import { createBrowserClient } from "@supabase/ssr";

export interface SupabaseClientConfig {
  url: string;
  anonKey: string;
}

/**
 * The Supabase env variables are server-only, so server components pass them
 * down as props. The anon key is public by design.
 */
export const getSupabaseClientConfig = (): SupabaseClientConfig => ({
  url: process.env.SUPABASE_URL || "",
  anonKey: process.env.SUPABASE_ANON_KEY || "",
});

export const createSupabaseBrowserClient = ({
  url,
  anonKey,
}: SupabaseClientConfig) => createBrowserClient(url, anonKey);
