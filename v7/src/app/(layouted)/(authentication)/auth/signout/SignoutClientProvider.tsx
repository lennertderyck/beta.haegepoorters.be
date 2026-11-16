"use client";

import { keycloakClientAuth } from "@/lib/vendors/better-auth/keycloak/client";
import { Slot } from "@radix-ui/react-slot";
import { useSearchParams } from "next/navigation";
import { ComponentProps, FC, useEffect, useTransition } from "react";
import { AUTH } from "../../../../../../auth.config";

interface Props extends ComponentProps<"div"> {
  asChild?: boolean;
  callbackURL?: string;
}

const SignoutClientProvider: FC<Props> = ({
  asChild,
  callbackURL,
  ...otherProps
}) => {
  const Comp = asChild ? Slot : "div";
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const finalCallbackURL =
    callbackURL || searchParams.get("callbackURL") || AUTH.BASE_URL;

  const startSignout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await keycloakClientAuth.signOut({
        callbackURL: finalCallbackURL
      });
    } catch (error) {
      return error as Error;
    }
  };

  const onLoad = () => {
    startTransition(() => {
      try {
        startSignout();
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    onLoad();
  }, []);

  return <Comp data-pending={isPending} {...otherProps} />;
};

export default SignoutClientProvider;
