import { normalizeStringCase } from "./formatters";

/**
 * Checks if a string is empty, `null`, or `undefined`.
 *
 * - Strict equality is used to check for `null` and `undefined`.
 * - Value is trimmed before checking for emptiness to ensure that strings with only whitespace are considered empty.
 * - It is not the same as checking if a value is a string, as it will return `true` for non-string values that are `null` or `undefined`.
 * It is specifically designed to check if a string value is empty or not provided.
 *
 * @example
 * isEmptyString('') // true
 * isEmptyString('   ') // true
 * isEmptyString('Hello') // false
 * isEmptyString(null) // trueWe
 * isEmptyString('null') // false
 * isEmptyString(undefined) // true
 * isEmptyString('undefined') // false
 */
export const isEmptyString = (
  value: string | undefined | null
): value is undefined | null => {
  return value === undefined || value === null || value.trim() === "";
};

/**
 * Case insensitive normalized partial string matching from left to right.
 *
 * @example
 * isPartialStringValueMatch('Hello World', 'hello') // true
 * isPartialStringValueMatch('Hello World', 'WORLD') // true
 * isPartialStringValueMatch('Hello World', 'goodbye') // false
 * isPartialStringValueMatch('Hello World', '') // false
 */
export const isPartialStringValueMatch = (
  source: string,
  query: string
): boolean => {
  return (
    query.length > 0 &&
    normalizeStringCase(source).includes(normalizeStringCase(query))
  );
};
