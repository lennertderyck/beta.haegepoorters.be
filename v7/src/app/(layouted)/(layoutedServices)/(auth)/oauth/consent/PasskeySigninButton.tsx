"use client";

import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import {
  createSupabaseBrowserClient,
  SupabaseClientConfig,
} from "@/lib/vendors/supabase/client";
import { FC, useState, useTransition } from "react";
import { consentURL } from "./urls";

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
      const { error } = await supabase.auth.signInWithPasskey();

      if (error) return setError(error.message);
      // A document navigation, a soft one would fetch the client's callback as RSC
      window.location.assign(consentURL(authorizationId));
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
