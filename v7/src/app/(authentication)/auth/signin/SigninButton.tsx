"use client";

import Button from "@/components/basics/Button/Button";
import { keycloakClientAuth } from "@/lib/vendors/better-auth/keycloak/client";
import { FC } from "react";

interface Props {
  callbackURL: string;
}

const SigninButton: FC<Props> = ({ callbackURL }) => {
  const handleSignin = async () => {
    try {
      const d = keycloakClientAuth.signIn.social({
        provider: "keycloak",
        callbackURL
      });
      console.log({ d });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleSignin}>Aanmelden met Groepsadmin</Button>
    </>
  );
};

export default SigninButton;
