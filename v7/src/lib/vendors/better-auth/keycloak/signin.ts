import { AUTH } from "../../../../../auth.config";
import { keycloakClientAuth } from "./client";

interface StartSigninOptions {
  provider: string;
  callbackURL: string;
  /** Marks the attempt as an automatic retry, so a second failure isn't retried again */
  isRetry?: boolean;
}

/**
 * Starts the OAuth sign-in. Failed callbacks land on the sign in page (with
 * `?error=`) instead of the target page, so the error can be shown or retried
 */
export const startSignin = ({
  provider,
  callbackURL,
  isRetry = false
}: StartSigninOptions) => {
  const { pathname, search } = new URL(callbackURL, AUTH.BASE_URL);
  const errorParams = new URLSearchParams({
    callbackUrl: pathname + search,
    provider,
    ...(isRetry && { retried: "1" })
  });

  return keycloakClientAuth.signIn.social({
    provider,
    callbackURL,
    errorCallbackURL: new URL(`/auth/signin?${errorParams}`, AUTH.BASE_URL).href
  });
};
