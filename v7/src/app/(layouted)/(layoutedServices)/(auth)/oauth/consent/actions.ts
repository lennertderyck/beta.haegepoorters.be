"use server";

import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { consentURL } from "./urls";

const decisionSchema = z.object({
  authorization_id: z.string().min(1),
  decision: z.enum(["approve", "deny"]),
});

export const decide = async (formData: FormData) => {
  const { authorization_id: authorizationId, decision } = decisionSchema.parse(
    Object.fromEntries(formData),
  );
  const supabase = await createSupabaseServerClient();

  const { data, error } =
    decision === "approve"
      ? await supabase.auth.oauth.approveAuthorization(authorizationId)
      : await supabase.auth.oauth.denyAuthorization(authorizationId);

  if (error) redirect(consentURL(authorizationId, error.message));
  // Only third-party clients get here, their redirect is cross-origin so the
  // browser does a full navigation
  redirect(data.redirect_url);
};
