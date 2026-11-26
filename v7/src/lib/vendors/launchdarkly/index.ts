import { z } from "zod";

export interface LaunchDarklyContext {
  kind: string;
  key: string;
  anonymous?: boolean;
  [attribute: string]: unknown;
}

/** Context used when a flag is evaluated without a specific user */
export const LAUNCHDARKLY_ANONYMOUS_CONTEXT: LaunchDarklyContext = {
  kind: "user",
  key: "anonymous",
  anonymous: true
};

/** Cache tag of the flag fetch; revalidated by the LaunchDarkly webhook */
export const LAUNCHDARKLY_CACHE_TAG = "launchdarkly";

/** Fallback refresh interval (seconds) when no webhook revalidates the cache */
const REVALIDATE_SECONDS = 300;
const EVALUATION_BASE_URL = "https://clientsdk.launchdarkly.com";
const EVALUATION_ENDPOINT_PATH = "/sdk/evalx";

const evaluatedFlagsSchema = z.record(
  z.string(),
  z.object({ value: z.unknown() })
);

/**
 * Fetches the evaluated flags for a context from LaunchDarkly's client-side
 * evaluation endpoint. Only flags with "SDKs using Client-side ID" enabled are
 * returned. Returns `null` when LaunchDarkly is not configured or unreachable.
 */
export const getLaunchDarklyFlags = async (
  context: LaunchDarklyContext = LAUNCHDARKLY_ANONYMOUS_CONTEXT
): Promise<Record<string, unknown> | null> => {
  const clientSideId = process.env.LAUNCHDARKLY_CLIENT_SIDE_ID;
  if (!clientSideId) return null;

  const encodedContext = Buffer.from(JSON.stringify(context)).toString(
    "base64url"
  );

  const url = new URL(
    `${EVALUATION_ENDPOINT_PATH}/${encodeURIComponent(clientSideId)}/contexts/${encodedContext}`,
    EVALUATION_BASE_URL
  );

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "force-cache",
      next: { revalidate: REVALIDATE_SECONDS, tags: [LAUNCHDARKLY_CACHE_TAG] }
    });

    if (!response.ok) {
      console.error(
        `[LaunchDarkly] flag evaluation failed with status ${response.status}`
      );
      return null;
    }

    const parsed = evaluatedFlagsSchema.safeParse(await response.json());
    if (!parsed.success) {
      console.error("[LaunchDarkly] unexpected flag evaluation response");
      return null;
    }

    console.log("[LaunchDarkly] evaluated flags:", parsed.data);

    return Object.fromEntries(
      Object.entries(parsed.data).map(([key, flag]) => [key, flag.value])
    );
  } catch (error) {
    console.error("[LaunchDarkly] flag evaluation request failed", error);
    return null;
  }
};
