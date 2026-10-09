"use client";

import Button from "@/components/basics/Button/Button";
import { keycloakClientAuth } from "@/lib/vendors/better-auth/keycloak/client";
import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<typeof Button> {
  callbackURL: string;
  provider: "keycloak" | "supabase";
}

const SigninButton: FC<Props> = ({ callbackURL, provider, ...otherProps }) => {
  const handleSignin = async () => {
    try {
      const d = keycloakClientAuth.signIn.social({
        provider,
        callbackURL
      });
      console.log({ d });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleSignin} {...otherProps}>
        Aanmelden met {provider}
      </Button>
    </>
  );
};

export default SigninButton;
