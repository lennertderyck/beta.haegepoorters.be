import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables");
}

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a server component, cookies can only be set in server actions/route handlers
          }
        }
      }
    }
  );
};
