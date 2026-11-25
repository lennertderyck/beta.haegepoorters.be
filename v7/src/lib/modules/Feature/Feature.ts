import type DeclaredFeatureFlags from "../../../../features.config";
import { FEATURE_FLAGS } from "../../../../features.config";

const Feature = {
  get: <Key extends keyof DeclaredFeatureFlags>(
    slug: Key
  ): DeclaredFeatureFlags[Key] => FEATURE_FLAGS[slug]
};

export default Feature;
