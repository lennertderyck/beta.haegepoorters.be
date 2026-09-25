export const DEFAULT_SELECTED_ACTIVITIES_GROUP = "kap";

export const ACTIVITY_TYPES = [
  {
    name: "default",
    label: "Gewone vergadering",
    descriptor: null,
    isMultiDay: false
  },
  {
    name: "weekend",
    label: "Weekend",
    descriptor: "Weekend",
    isMultiDay: true
  },
  { name: "camp", label: "Kamp", descriptor: "Kamp", isMultiDay: true },
  {
    name: "multi",
    label: "Meerdaagse activiteit",
    descriptor: null,
    isMultiDay: true
  },
  {
    name: "none",
    label: "Geen activiteit",
    descriptor: "Geen activiteit",
    isMultiDay: false
  }
] as const;
