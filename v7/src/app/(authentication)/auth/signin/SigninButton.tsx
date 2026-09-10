"use client";

import Button from "@/components/basics/Button/Button";
import { keycloakClientAuth } from "@/lib/vendors/better-auth/keycloak/client";
import { FC } from "react";

interface Props {}

const SigninButton: FC<Props> = () => {
  const handleSignin = async () => {
    try {
      const d = keycloakClientAuth.signIn.social({
        provider: "keycloak"
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
