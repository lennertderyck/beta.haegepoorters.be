import COOKIES from "@/lib/constants/cookies";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { createAuthClient } from "better-auth/client";
import { nextCookies } from "better-auth/next-js";

const AUTH_URL_ORIGIN = process.env.NEXT_PUBLIC_AUTH_URL;
const AUTHN_URL_PATHNAME = "/api/auth";
const SIGNIN_CONTEXT_FIELDNAME = "signinContext";

export const createBetterAuthServerInstance = (
  /**
   * @param signInContext The context for which this authentication instance is created.
   * @description Database-driven authentication and other forms of authentication cannot be combined. Therefore you can create separate instances for each sign-in context.
   */
  signInContext: string,
  { plugins, ...otherOptions }: Omit<BetterAuthOptions, "baseURL" | "secret">
) => {
  return betterAuth({
    baseURL: AUTH_URL_ORIGIN + AUTHN_URL_PATHNAME + "/" + signInContext,
    secret: process.env.AUTH_SECRET!,
    ...otherOptions,
    plugins: [nextCookies(), ...(plugins ?? [])],
    hooks: {
      after: createAuthMiddleware(async (ctx) => {
        if (ctx.context.newSession)
          ctx.setCookie(COOKIES.SESSIN_METHOD, signInContext, {
            path: "/",
            httpOnly: true,
            sameSite: "Strict",
            expires:
              ctx.context.newSession?.session.expiresAt ||
              ctx.context.session?.session.expiresAt
          });
      })
    }
  });
};

export const createBetterAuthClientInstance = (url: string) => {
  return createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: AUTH_URL_ORIGIN + AUTHN_URL_PATHNAME + "/" + url
  });
};

type BetterAuthSession = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<typeof createBetterAuthServerInstance>["api"]["getSession"]
    >
  >
>;

export type { BetterAuthSession };
