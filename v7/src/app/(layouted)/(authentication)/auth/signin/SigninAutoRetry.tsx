"use client";

import { startSignin } from "@/lib/vendors/better-auth/keycloak/signin";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  provider: string;
  callbackURL: string;
}

/**
 * Keycloak answers with `temporarily_unavailable` when its login session was
 * replaced or expired. Its SSO session is usually still there, so starting the
 * sign-in again completes without a password prompt. Only retried once
 */
const SigninAutoRetry: FC<Props> = ({ provider, callbackURL }) => {
  const hasStarted = useRef(false);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    startSignin({ provider, callbackURL, isRetry: true }).catch((error) => {
      console.error(error);
      setHasFailed(true);
    });
  }, [provider, callbackURL]);

  if (hasFailed) {
    return (
      <p role="alert" className="mb-6 text-center font-medium text-red-700">
        Het aanmelden is mislukt. Probeer het opnieuw.
      </p>
    );
  }

  return <p className="mb-6 text-center">Bezig met aanmelden…</p>;
};

export default SigninAutoRetry;
