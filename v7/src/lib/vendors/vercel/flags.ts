import { createVercelAdapter } from "@flags-sdk/vercel";
import { JsonValue } from "flags";
import { flag } from "flags/next";

const adapter = createVercelAdapter(process.env.VERCEL_FLAGS_TOKEN!);

export const getVercelFeatureFlag = <
  ValueType extends JsonValue = boolean | string | number
>(
  key: string
) =>
  flag<ValueType>({
    key,
    adapter
  })();
