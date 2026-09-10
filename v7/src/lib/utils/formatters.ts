import { isEmptyString } from "./validators";

/**
 * Normalizes a string by trimming whitespace and converting to lowercase.
 * If the input is `null`, `undefined`, or an empty string (after trimming), it returns an empty string.
 */
export const normalizeStringCase = (
  value: string | undefined | null
): string => {
  if (isEmptyString(value)) return "";
  else return value.trim().toLowerCase();
};

/**
 * Removes all non-alphanumeric characters from the input, but preserves the case of letters.
 *
 * Note that this is a case sensitive function.
 */
export const normalizeAlphanumericString = (
  value: string | undefined | null
): string => {
  if (isEmptyString(value)) return "";
  else return value.replace(/[^a-zA-Z0-9]/gi, "");
};
