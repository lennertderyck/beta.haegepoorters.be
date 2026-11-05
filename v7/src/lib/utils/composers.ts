import { clsx, type ClassValue } from "clsx";
import { createElement } from "react";
import { twMerge } from "tailwind-merge";
import { ACTIVITY_TYPES } from "../constants/constants";
import { Activity } from "../server/queries/activities";

/**
 * Merges class names together, deduplicating and merging Tailwind classes.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** Generate srcSet attribute for responsive images */
export const composeImageSourceSet = (
  input: Record<number, string> | (string | number)[][]
) => {
  const inputArray = Array.isArray(input) ? input : Object.entries(input);
  return inputArray.map(([size, url]) => `${url} ${size}w`).join(", ");
};

export const composeActivityTitle = (activity: Activity) => {
  const activityTypeDescriptor = ACTIVITY_TYPES.find(
    (type) => type.name === activity.type
  )?.descriptor;

  const parts = [activityTypeDescriptor, activity.title].filter(Boolean);

  if (parts.length === 0)
    return createElement(
      "span",
      {
        className: "text-neutral-400"
      },
      "Activiteit zonder titel"
    );
  else return parts.join(": ");
};
