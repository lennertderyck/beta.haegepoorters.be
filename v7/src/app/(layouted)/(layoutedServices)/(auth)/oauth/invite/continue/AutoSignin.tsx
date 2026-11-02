"use client";

import SigninButton from "@/app/(authentication)/auth/signin/SigninButton";
import { keycloakClientAuth } from "@/lib/vendors/better-auth/keycloak/client";
import { FC, useEffect, useRef } from "react";
import { AUTH } from "../../../../../../../auth.config";

/**
 * The Supabase session exists now, start the site's OAuth sign-in so it gets
 * a Better Auth session too
 */
const AutoSignin: FC = () => {
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    keycloakClientAuth.signIn
      .social({ provider: "supabase", callbackURL: AUTH.BASE_URL })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <p>Bezig met aanmelden…</p>
      <SigninButton provider="supabase" callbackURL={AUTH.BASE_URL}>
        <button type="button" className="underline">
          Gebeurt er niets? Klik hier.
        </button>
      </SigninButton>
    </div>
  );
};

export default AutoSignin;
