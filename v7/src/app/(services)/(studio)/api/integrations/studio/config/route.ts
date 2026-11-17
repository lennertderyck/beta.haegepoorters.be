import { ACTIVITY_TYPES } from "@/lib/constants/constants";
import { PAYMENT_RECIPIENTS } from "@/lib/constants/payments";

const EXPOSED_STUDIO_CONFIG = {
  ACTIVITY_TYPES,
  PAYMENT_RECIPIENTS
};

export const GET = (request: Request) => {
  // return JSON
  return new Response(JSON.stringify(EXPOSED_STUDIO_CONFIG), {
    headers: { "Content-Type": "application/json" }
  });
};
