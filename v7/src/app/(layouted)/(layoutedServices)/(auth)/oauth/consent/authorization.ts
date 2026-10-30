import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { AUTH } from "../../../../../../auth.config";

/**
 * Resolves where a signed in user should go for an authorization: straight
 * back to the client when consent exists or the client is this site itself,
 * or `null` to show the consent screen for third-party clients
 */
export const resolveAuthorization = async (
  authorizationId: string,
): Promise<{ redirectTo: string | null } | { error: string }> => {
  const supabase = await createSupabaseServerClient();

  // Every getAuthorizationDetails call mints a new code when consent already
  // exists, so this may only run once per sign-in
  const { data: details, error: detailsError } =
    await supabase.auth.oauth.getAuthorizationDetails(authorizationId);

  if (detailsError) return { error: detailsError.message };
  if ("redirect_url" in details) return { redirectTo: details.redirect_url };

  // details.client.id is Supabase's internal id, not our client_id, so
  // recognise our own app by where it redirects to
  const isOwnClient =
    new URL(details.redirect_uri).origin === new URL(AUTH.BASE_URL).origin;
  if (!isOwnClient) return { redirectTo: null };

  const { data, error } =
    await supabase.auth.oauth.approveAuthorization(authorizationId);

  if (error) return { error: error.message };
  return { redirectTo: data.redirect_url };
};
