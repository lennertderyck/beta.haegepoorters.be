"use client";

import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import {
  createSupabaseBrowserClient,
  SupabaseClientConfig,
} from "@/lib/vendors/supabase/client";
import { FC, useState, useTransition } from "react";
import { resolveAuthorization } from "./actions";

interface Props {
  authorizationId: string;
  supabaseConfig: SupabaseClientConfig;
}

const PasskeySigninButton: FC<Props> = ({
  authorizationId,
  supabaseConfig,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSigninButtonClick = () =>
    startTransition(async () => {
      setError(null);
      const supabase = createSupabaseBrowserClient(supabaseConfig);
      // Sets the Supabase session cookies, so the server action can read them
      const { error } = await supabase.auth.signInWithPasskey();

      if (error) return setError(error.message);
      await resolveAuthorization(authorizationId);
    });

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        disabled={isPending}
        onClick={onSigninButtonClick}
      >
        <Icon name="key-2-line" />
        Aanmelden met passkey
      </Button>
      {error && <p>{error}</p>}
    </>
  );
};

export default PasskeySigninButton;
