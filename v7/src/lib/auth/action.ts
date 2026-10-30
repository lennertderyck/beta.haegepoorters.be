import "server-only";

import type { z } from "zod";
import { type Capability, requireCapability, type Viewer } from "./guards";

interface ActionOptions<S extends z.ZodType> {
  /** The user needs at least one of these. Empty means any signed in user */
  capabilities: Capability[];
  input: S;
}

/**
 * Wraps a server action so it always checks the caller's capabilities and
 * validates its input before running. Use it for every export of a
 * "use server" file, as those are public POST endpoints
 *
 * @example
 * export const deleteThingAction = defineAction(
 *   { capabilities: ["webmaster"], input: z.string() },
 *   async (id) => deleteThing(id),
 * );
 */
export const defineAction =
  <S extends z.ZodType, R>(
    options: ActionOptions<S>,
    handler: (input: z.infer<S>, viewer: Viewer) => Promise<R>,
  ) =>
  async (input: z.input<S>): Promise<R> => {
    const viewer = await requireCapability(...options.capabilities);
    return handler(options.input.parse(input), viewer);
  };
