import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { LAUNCHDARKLY_CACHE_TAG } from "@/lib/vendors/launchdarkly";

/**
 * LaunchDarkly webhook: invalidates the cached flag evaluations when a flag
 * changes. Public endpoint, authenticated by the webhook's HMAC-SHA256
 * signature (`X-LD-Signature`) over the raw request body.
 */
const isValidSignature = (
  body: string,
  signature: string | null,
  secret: string
): boolean => {
  if (!signature) return false;

  const expected = Buffer.from(
    createHmac("sha256", secret).update(body).digest("hex")
  );
  const received = Buffer.from(signature);

  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
};

export const POST = async (request: Request): Promise<Response> => {
  const secret = process.env.LAUNCHDARKLY_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("Webhook not configured", { status: 401 });
  }

  const body = await request.text();
  if (!isValidSignature(body, request.headers.get("x-ld-signature"), secret)) {
    return new Response("Invalid signature", { status: 401 });
  }

  revalidateTag(LAUNCHDARKLY_CACHE_TAG, "max");

  return Response.json({ revalidated: true });
};
