import { AUTH } from "../../auth.config";

export const composeCallbackURL = (
  callbackRoute: string | string[] | undefined
) => {
  if (callbackRoute !== undefined) {
    return new URL(String(callbackRoute), process.env.NEXT_PUBLIC_AUTH_URL);
  } else {
    return new URL(AUTH.FALLBACK_PATH, process.env.NEXT_PUBLIC_AUTH_URL);
  }
};
