import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import { PAYMENT_RECIPIENTS } from "@/lib/constants/payments";

const EXPOSED_STUDIO_CONFIG = {
  ACTIVITY_TYPES,
  PAYMENT_RECIPIENTS
};

const ALLOWED_ORIGINS = new Set([
  "http://localhost:3333",
  ...(process.env.STUDIO_ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [])
]);
const SANITY_STUDIO_ORIGIN = /^https:\/\/[a-z0-9-]+\.sanity\.studio$/;

const isAllowedOrigin = (origin: string | null): origin is string =>
  !!origin && (ALLOWED_ORIGINS.has(origin) || SANITY_STUDIO_ORIGIN.test(origin));

const corsHeaders = (request: Request): HeadersInit => {
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) return { Vary: "Origin" };

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    Vary: "Origin"
  };
};

export const GET = (request: Request) =>
  Response.json(EXPOSED_STUDIO_CONFIG, { headers: corsHeaders(request) });

export const OPTIONS = (request: Request) =>
  new Response(null, { status: 204, headers: corsHeaders(request) });
