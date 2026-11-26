import {
    LAUNCHDARKLY_ANONYMOUS_CONTEXT,
    getLaunchDarklyFlags,
    type LaunchDarklyContext
} from "@/lib/vendors/launchdarkly";
import type DeclaredFeatureFlags from "../../../../features.config";

const Feature = {
  /**
   * Reads a flag from LaunchDarkly. Returns `false` (off) when LaunchDarkly is
   * not configured, unreachable, or returns no boolean value for the flag.
   */
  get: async <Key extends keyof DeclaredFeatureFlags>(
    slug: Key,
    context: LaunchDarklyContext = LAUNCHDARKLY_ANONYMOUS_CONTEXT
  ): Promise<DeclaredFeatureFlags[Key]> => {
    const flags = await getLaunchDarklyFlags(context);
    const value = flags?.[slug];

    return typeof value === "boolean" ? value : false;
  }
};

export default Feature;
