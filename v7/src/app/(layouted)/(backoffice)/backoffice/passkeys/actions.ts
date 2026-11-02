"use server";

import { defineAction } from "@/lib/auth/action";
import { createSupabaseServerClient } from "@/lib/vendors/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deletePasskeyAction = defineAction(
  { capabilities: ["webmaster"], input: z.string().min(1) },
  async (passkeyId) => {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.passkey.delete({ passkeyId });

    if (error) return { error: error.message };

    revalidatePath("/backoffice/passkeys");
    return { error: null };
  },
);
