export const DEFAULT_SELECTED_ACTIVITIES_GROUP = "kap";

export const ACTIVITY_TYPES = [
  {
    name: "default",
    label: "Gewone vergadering",
    descriptor: null,
    isMultiDay: false,
    features: { isInTypeSelector: true }
  },
  {
    name: "weekend",
    label: "Weekend",
    descriptor: "Weekend",
    isMultiDay: true,
    features: { isInTypeSelector: true }
  },
  {
    name: "camp",
    label: "Kamp",
    descriptor: "Kamp",
    isMultiDay: true,
    features: { isInTypeSelector: true }
  },
  {
    name: "multi",
    label: "Meerdaagse activiteit",
    descriptor: null,
    isMultiDay: true,
    features: { isInTypeSelector: true }
  },
  {
    name: "none",
    label: "Geen activiteit",
    descriptor: "Geen activiteit",
    isMultiDay: false,
    features: { isInTypeSelector: true }
  },
  {
    name: "linked",
    label: "Gerelateerde activiteit",
    descriptor: null,
    isMultiDay: false,
    features: { isInTypeSelector: false }
  }
] as const;
