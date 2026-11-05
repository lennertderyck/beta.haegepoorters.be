import { getVercelFeatureFlag } from "@/lib/vendors/vercel/flags";
import DeclaredFeatureFlags from "../../../../features.config";

const Feature = {
  get: <Key extends keyof DeclaredFeatureFlags>(
    slug: Key
  ): ReturnType<typeof getVercelFeatureFlag<DeclaredFeatureFlags[Key]>> => {
    return getVercelFeatureFlag<DeclaredFeatureFlags[Key]>(slug);
  }
};

export default Feature;
