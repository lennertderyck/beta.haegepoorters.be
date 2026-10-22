"use server";

import { createSupabaseAdminClient } from "@/lib/vendors/supabase/admin";
import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { AUTH } from "../../../../../auth.config";

const INVITE_EMAIL = "webmaster@haegepoorters.be";

type InviteResult = { error: string; url: null } | { error: null; url: string };

/**
 * Creates a single-use login link for the webmaster account. The token is a
 * Supabase magic link token, so it expires with the project's OTP expiry
 */
export const createInviteAction = async (): Promise<InviteResult> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Niet aangemeld als webmaster.", url: null };

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: INVITE_EMAIL,
  });

  if (error) return { error: error.message, url: null };

  const params = new URLSearchParams({
    token_hash: data.properties.hashed_token,
  });
  return { error: null, url: `${AUTH.BASE_URL}/oauth/invite?${params}` };
};
