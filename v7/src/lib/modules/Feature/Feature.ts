import { declareVercelFeatureFlag } from "@/lib/vendors/vercel/flags";
import DeclaredFeatureFlags from "../../../../features.config";

type FeatureFlags = {
  [Key in keyof DeclaredFeatureFlags]: () => Promise<DeclaredFeatureFlags[Key]>;
};

const flags: FeatureFlags = {
  "membership-card": declareVercelFeatureFlag("membership-card"),
  "authentication-header": declareVercelFeatureFlag("authentication-header"),
  "trooper-rootnavigation": declareVercelFeatureFlag("trooper-rootnavigation"),
  "trooper-homepage": declareVercelFeatureFlag("trooper-homepage"),
  "activities-group-select": declareVercelFeatureFlag("activities-group-select")
};

const Feature = {
  get: <Key extends keyof DeclaredFeatureFlags>(slug: Key) => flags[slug]()
};

export default Feature;
