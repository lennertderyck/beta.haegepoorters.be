import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { consentURL } from "../urls";

/**
 * Signs in and sends the browser back to the consent page with a 303, so it
 * loads as a document and its redirect to the client is a real navigation
 */
export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const authorizationId = formData.get("authorization_id") as string;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  return NextResponse.redirect(
    new URL(consentURL(authorizationId, error?.message), request.url),
    303,
  );
};
