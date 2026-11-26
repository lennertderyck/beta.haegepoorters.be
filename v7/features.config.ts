/**
 * Feature flags managed in LaunchDarkly. Keys must match the LaunchDarkly flag
 * keys, and each flag needs "SDKs using Client-side ID" enabled.
 */
interface DeclaredFeatureFlags {
  "membership-card": boolean;
  "authentication-header": boolean;
  "trooper-rootnavigation": boolean;
  "trooper-homepage": boolean;
  "activities-group-select": boolean;
}

export default DeclaredFeatureFlags;
