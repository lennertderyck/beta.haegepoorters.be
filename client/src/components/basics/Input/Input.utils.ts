import dayjs, { ConfigType } from "dayjs";
import { HTMLInputTypeAttribute } from "react";

const DATE_LIKE_INPUT_FORMATS: Partial<Record<HTMLInputTypeAttribute, string>> = {
  "date": "YYYY-MM-DD",
  "datetime-local": "YYYY-MM-DDTHH:mm",
}

export const dateInputLikeFormatter = (value: ConfigType, type: keyof typeof DATE_LIKE_INPUT_FORMATS) => {
  return dayjs(value).format(DATE_LIKE_INPUT_FORMATS[type]);
}