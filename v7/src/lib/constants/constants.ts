export const DEFAULT_SELECTED_ACTIVITIES_GROUP = "kap";

export const ACTIVITY_TYPES = [
  { name: "default", label: "Gewone vergadering", isMultiDay: false },
  { name: "weekend", label: "Weekend", isMultiDay: true },
  { name: "camp", label: "Kamp", isMultiDay: true },
  { name: "multi", label: "Meerdaagse activiteit", isMultiDay: true },
  { name: "none", label: "Geen activiteit", isMultiDay: false }
] as const;
