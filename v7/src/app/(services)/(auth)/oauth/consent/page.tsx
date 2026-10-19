import Button from "@/components/basics/Button/Button";
import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { redirect } from "next/navigation";
import { FC } from "react";
import { decide, signin } from "./actions";

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
    return (
      <>
        {error && <p>{error}</p>}
        <form action={signin}>
          <input
            type="hidden"
            name="authorization_id"
            value={authorization_id}
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Wachtwoord"
            autoComplete="current-password"
            required
          />
          <Button type="submit">Aanmelden</Button>
        </form>
      </>
    );
  }

  const { data: details, error: detailsError } =
    await supabase.auth.oauth.getAuthorizationDetails(authorization_id);

  if (detailsError) return <p>{detailsError.message}</p>;
  // Already consented before: Supabase returns a redirect right away.
  // Only reached on a direct GET by a logged in user; after signing in, the signin action handles this itself
  // so the page isn't rendered again and a second code isn't minted
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
