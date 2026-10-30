import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Exchanges the single-use invite token for a Supabase session, then continues
 * to the regular OAuth sign-in which finds that session and auto-approves
 */
export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const tokenHash = formData.get("token_hash") as string;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "magiclink",
  });

  if (error) {
    const params = new URLSearchParams({
      token_hash: tokenHash,
      error: "Deze link is al gebruikt of verlopen.",
    });
    return NextResponse.redirect(
      new URL("/oauth/invite?" + params.toString(), request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/oauth/invite/continue", request.url),
    303,
  );
};
