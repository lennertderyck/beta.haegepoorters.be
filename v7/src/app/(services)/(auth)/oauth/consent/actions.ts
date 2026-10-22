"use server";

import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { redirect } from "next/navigation";

const consentURL = (authorizationId: string, error?: string) => {
  const params = new URLSearchParams({ authorization_id: authorizationId });
  if (error) params.set("error", error);
  return "/oauth/consent?" + params.toString();
};

export const signin = async (formData: FormData) => {
  const authorizationId = formData.get("authorization_id") as string;
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) redirect(consentURL(authorizationId, error.message));

  await resolveAuthorization(authorizationId);
};

/** Called after signing in, with a password or with a passkey in the browser */
export const resolveAuthorization = async (authorizationId: string) => {
  const supabase = await createSupabaseServerClient();

  // Resolve the authorization here instead of on the consent page: every
  // getAuthorizationDetails call mints a new code when consent already exists,
  // and re-rendering the page after this action would invalidate the first one
  const { data: details, error: detailsError } =
    await supabase.auth.oauth.getAuthorizationDetails(authorizationId);

  if (detailsError) redirect(consentURL(authorizationId, detailsError.message));
  if ("redirect_url" in details) redirect(details.redirect_url);

  redirect(consentURL(authorizationId));
};

export const decide = async (formData: FormData) => {
  const authorizationId = formData.get("authorization_id") as string;
  const supabase = await createSupabaseServerClient();

  const { data, error } =
    formData.get("decision") === "approve"
      ? await supabase.auth.oauth.approveAuthorization(authorizationId)
      : await supabase.auth.oauth.denyAuthorization(authorizationId);

  if (error) redirect(consentURL(authorizationId, error.message));
  redirect(data.redirect_url);
};
