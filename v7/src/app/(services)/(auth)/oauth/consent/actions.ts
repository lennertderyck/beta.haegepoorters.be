"use server";

import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { redirect } from "next/navigation";
import { consentURL } from "./urls";

export const decide = async (formData: FormData) => {
  const authorizationId = formData.get("authorization_id") as string;
  const supabase = await createSupabaseServerClient();

  const { data, error } =
    formData.get("decision") === "approve"
      ? await supabase.auth.oauth.approveAuthorization(authorizationId)
      : await supabase.auth.oauth.denyAuthorization(authorizationId);

  if (error) redirect(consentURL(authorizationId, error.message));
  // Only third-party clients get here, their redirect is cross-origin so the
  // browser does a full navigation
  redirect(data.redirect_url);
};
