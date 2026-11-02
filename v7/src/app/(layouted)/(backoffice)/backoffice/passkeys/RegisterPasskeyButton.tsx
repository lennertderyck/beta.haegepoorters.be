"use client";

import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import Notice from "@/components/basics/Notice/Notice";
import {
  createSupabaseBrowserClient,
  SupabaseClientConfig,
} from "@/lib/vendors/supabase/client";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState, useTransition } from "react";

interface Props {
  supabaseConfig: SupabaseClientConfig;
}

const RegisterPasskeyButton: FC<Props> = ({ supabaseConfig }) => {
  const router = useRouter();
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsSupported(typeof window.PublicKeyCredential !== "undefined");
  }, []);

  const onRegisterButtonClick = () =>
    startTransition(async () => {
      setError(null);
      const supabase = createSupabaseBrowserClient(supabaseConfig);
      const { error } = await supabase.auth.registerPasskey();

      if (error) return setError(error.message);
      router.refresh();
    });

  if (!isSupported) {
    return <Notice>Deze browser ondersteunt geen passkeys.</Notice>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        disabled={isPending}
        onClick={onRegisterButtonClick}
      >
        <Icon name="key-2-line" />
        Passkey toevoegen
      </Button>
      {error && <Notice>{error}</Notice>}
    </div>
  );
};

export default RegisterPasskeyButton;
