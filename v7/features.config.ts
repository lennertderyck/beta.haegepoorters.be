interface DeclaredFeatureFlags {
  "membership-card": boolean;
  "authentication-header": boolean;
  "trooper-rootnavigation": boolean;
  "trooper-homepage": boolean;
  "activities-group-select": boolean;
}

/** Hard-coded feature flag values: change here and redeploy to toggle a feature */
export const FEATURE_FLAGS: DeclaredFeatureFlags = {
  "membership-card": true,
  "authentication-header": false,
  "trooper-rootnavigation": false,
  "trooper-homepage": true,
  "activities-group-select": true
};

export default DeclaredFeatureFlags;
