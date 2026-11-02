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

export type FormattedNumberInputMde = "manual" | "auto";

export const createNumberFormattedInput = (
  defaultAmount: number,
  mode: FormattedNumberInputMde,
  decimals: number = 2 // only used in auto mode
) => {
  const factor = mode === "auto" ? 10 ** decimals : 1;

  let raw = Math.round(Math.max(0, defaultAmount) * factor);

  return {
    get amount(): number {
      return raw / factor;
    },

    get formatted(): string {
      return (raw / factor).toFixed(mode === "auto" ? decimals : 0);
    },

    add(n: number): void {
      if (!Number.isInteger(n) || n < 0) {
        throw new Error("add() expects a non-negative integer");
      }
      raw = raw * 10 ** String(n).length + n; // digit count via math below if preferred
    },

    remove(count = 1): void {
      raw = Math.floor(raw / 10 ** Math.max(0, count));
    }
  };
};