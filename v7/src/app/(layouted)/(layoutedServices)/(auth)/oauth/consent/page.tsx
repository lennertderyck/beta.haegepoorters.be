import Button from "@/components/basics/Button/Button";
import { getSupabaseClientConfig } from "@/lib/vendors/supabase/client";
import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { redirect } from "next/navigation";
import { FC } from "react";
import { decide } from "./actions";
import { resolveAuthorization } from "./authorization";
import PasskeySigninButton from "./PasskeySigninButton";
import SigninForm from "./SigninForm";

const Page: FC<PageProps<"/oauth/consent">> = async ({ searchParams }) => {
  const { authorization_id, error } = await searchParams;

  if (typeof authorization_id !== "string") {
    return <p>Ongeldige aanvraag: authorization_id ontbreekt.</p>;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Both come back to this page as a document load, so the redirect below is
    // a real navigation
    return (
      <>
        {error && <p>{error}</p>}
        <SigninForm authorizationId={authorization_id} />
        <PasskeySigninButton
          authorizationId={authorization_id}
          supabaseConfig={getSupabaseClientConfig()}
        />
      </>
    );
  }

  // Consent exists or the client is this site itself: go straight back
  const result = await resolveAuthorization(authorization_id);

  if ("error" in result) return <p>{result.error}</p>;
  if (result.redirectTo) redirect(result.redirectTo);

  const { data: details, error: detailsError } =
    await supabase.auth.oauth.getAuthorizationDetails(authorization_id);

  if (detailsError) return <p>{detailsError.message}</p>;
  if ("redirect_url" in details) redirect(details.redirect_url);

  return (
    <>
      {error && <p>{error}</p>}
      <p>
        <strong>{details.client.name}</strong> wil toegang tot je account (
        {details.user.email}).
      </p>
      <p>Gevraagde rechten: {details.scope}</p>
      <form action={decide}>
        <input type="hidden" name="authorization_id" value={authorization_id} />
        <Button type="submit" name="decision" value="approve">
          Toestaan
        </Button>
        <Button type="submit" name="decision" value="deny" variant="secondary">
          Weigeren
        </Button>
      </form>
    </>
  );
};

export default Page;
