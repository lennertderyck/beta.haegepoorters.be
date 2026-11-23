import { createVercelAdapter } from "@flags-sdk/vercel";
import { JsonValue } from "flags";
import { flag } from "flags/next";

const adapter = createVercelAdapter(process.env.VERCEL_FLAGS_TOKEN!);

/** Declare once at module level, then call the returned flag to evaluate it */
export const declareVercelFeatureFlag = <ValueType extends JsonValue>(
  key: string
) => flag<ValueType>({ key, adapter });
