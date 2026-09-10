import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names together, deduplicating and merging Tailwind classes.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
