"use client";

import Button from "@/components/basics/Button/Button";
import { keycloakClientAuth } from "@/lib/vendors/better-auth/keycloak/client";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC, useTransition } from "react";
import { AUTH } from "../../../../../auth.config";

interface Props extends ComponentProps<typeof Button> {
  callbackURL: string;
  provider: "keycloak" | "supabase";
}

const SigninButton: FC<Props> = ({
  callbackURL,
  provider,
  children,
  ...otherProps
}) => {
  const [isPending, startTransition] = useTransition();

  const startSignin = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await keycloakClientAuth.signIn.social({
        provider,
        callbackURL: callbackURL || AUTH.BASE_URL
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
