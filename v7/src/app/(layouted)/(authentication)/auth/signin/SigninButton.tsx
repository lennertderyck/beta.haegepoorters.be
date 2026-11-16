"use client";

import Button from "@/components/basics/Button/Button";
import { AuthLoginProvider } from "@/lib/modules/Auth";
import { keycloakClientAuth } from "@/lib/vendors/better-auth/keycloak/client";
import { Slot } from "@radix-ui/react-slot";
import { usePathname } from "next/navigation";
import { ComponentProps, FC, useTransition } from "react";
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

  const finalCallbackURL = callbackURL || pathname || AUTH.BASE_URL;

  const startSignin = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await keycloakClientAuth.signIn.social({
        provider: String(provider),
        callbackURL: finalCallbackURL
      });
    } catch (error) {
      return error as Error;
    }
  };

  const onClick = () =>
    startTransition(async () => {
      try {
        await startSignin();
      } catch (e) {
        console.error(e);
      }
    });

  const Comp = !!children ? Slot : Button;

  return (
    <>
      <Comp onClick={onClick} data-pending={isPending} {...otherProps}>
        {children ?? `Aanmelden met ${provider}`}
      </Comp>
    </>
  );
};

export default SigninButton;
