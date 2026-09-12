import COOKIES from "@/lib/constants/cookies";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { createAuthClient } from "better-auth/client";
import { nextCookies } from "better-auth/next-js";

const BASE_URL = "/api/auth";
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
    baseURL: "http://localhost:3000" + BASE_URL + "/" + signInContext,
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
    baseURL: "http://localhost:3000" + BASE_URL + "/" + url
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
