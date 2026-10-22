"use server";

import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { revalidatePath } from "next/cache";

export const deletePasskeyAction = async (passkeyId: string) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.passkey.delete({ passkeyId });

  if (error) return { error: error.message };

  revalidatePath("/backoffice/passkeys");
  return { error: null };
};
