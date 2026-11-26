"use client";

import Button from "@/components/basics/Button/Button";
import { AuthLoginProvider } from "@/lib/modules/Auth";
import { startSignin } from "@/lib/vendors/better-auth/keycloak/signin";
import { Slot } from "@radix-ui/react-slot";
import { usePathname } from "next/navigation";
import { ComponentProps, FC, useState, useTransition } from "react";
import { AUTH } from "../../../../../../auth.config";

interface Props extends ComponentProps<typeof Button> {
  callbackURL?: string;
  provider: AuthLoginProvider;
}

const SigninButton: FC<Props> = ({
  callbackURL,
  provider,
  children,
  ...otherProps
}) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);

  const finalCallbackURL = callbackURL || pathname || AUTH.BASE_URL;

  const onClick = () =>
    startTransition(async () => {
      try {
        setError(null);
        await startSignin({
          provider: String(provider),
          callbackURL: finalCallbackURL
        });
      } catch (e) {
        setError(e as Error);
      }
    });

  const Comp = !!children ? Slot : Button;

  return (
    <>
      <Comp onClick={onClick} data-pending={isPending} {...otherProps}>
        {children ?? `Aanmelden met ${provider}`}
      </Comp>
      {error && (
        <p className="text-red-500 mt-2 text-center">
          Het lukte niet om je aan te melden. Probeer het later (vandaag)
          opnieuw.
        </p>
      )}
    </>
  );
};

export default SigninButton;
