import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { authMemory } from "@/lib/initializer";

/** Routes that read the Supabase session server-side */
const SUPABASE_SESSION_PATHS = ["/oauth", "/backoffice"];

/**
 * Server components can't write cookies, so refresh the Supabase session here
 * and pass the rotated tokens on to both the request and the browser
 */
const refreshSupabaseSession = async (request: NextRequest) => {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
};

export async function proxy(request: NextRequest) {
  await authMemory.initalize();

  if (
    SUPABASE_SESSION_PATHS.some((path) =>
      request.nextUrl.pathname.startsWith(path),
    )
  ) {
    return refreshSupabaseSession(request);
  }

  return NextResponse.next();
}
