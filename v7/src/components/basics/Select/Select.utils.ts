export const createSelectTriggerLabel = (
  strings: TemplateStringsArray,
  ...interpolations: string[]
) => {
  return (value: string | null) =>
    strings.reduce((label, string, index) => {
      const interpolation = interpolations[index - 1];
      const replacement =
        interpolation === "value" ? (value ?? "") : (interpolation ?? "");

      return `${label}${replacement}${string}`;
    }, "");
};