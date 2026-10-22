"use client";

import Button from "@/components/basics/Button/Button";
import { keycloakClientAuth } from "@/lib/vendors/better-auth/keycloak/client";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";
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
  const handleSignin = async () => {
    try {
      await keycloakClientAuth.signIn.social({
        provider,
        callbackURL: callbackURL || AUTH.BASE_URL
      });
    } catch (error) {
      console.error(error);
    }
  };

  const Comp = !!children ? Slot : Button;

  return (
    <>
      <Comp onClick={handleSignin} {...otherProps}>
        {children ?? `Aanmelden met ${provider}`}
      </Comp>
    </>
  );
};

export default SigninButton;
