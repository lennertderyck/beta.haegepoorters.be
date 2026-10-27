import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
