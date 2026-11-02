import "server-only";

import dayjs from "dayjs";
import { forbidden, unauthorized } from "next/navigation";
import { cache } from "react";
import { getSessionServer } from "../modules/Auth.utils";

export type Capability =
  | "registered"
  | "active"
  | "member"
  | "leader"
  | "webmaster";

type Session = NonNullable<Awaited<ReturnType<typeof getSessionServer>>>;

export interface Viewer {
  session: Session;
  capabilities: Capability[];
}

/**
 * Returns the signed in user for this request, or null when there is no
 * valid (non-expired) session. Cached per request
 */
export const getViewer = cache(async (): Promise<Viewer | null> => {
  const session = await getSessionServer();
  if (!session || !dayjs(session.session.expiresAt).isAfter(dayjs())) {
    return null;
  }

  return {
    session,
    capabilities: (session.user.capabilities ?? []) as Capability[],
  };
});

/**
 * Must be the first call in every server action and protected page. Ends the
 * request with a 401 without a session, or a 403 when the user has none of
 * the given capabilities. Without capabilities any signed in user passes
 */
export const requireCapability = async (
  ...capabilities: Capability[]
): Promise<Viewer> => {
  const viewer = await getViewer();
  if (!viewer) unauthorized();

  const isAllowed =
    capabilities.length === 0 ||
    capabilities.some((capability) => viewer.capabilities.includes(capability));
  if (!isAllowed) forbidden();

  return viewer;
};
