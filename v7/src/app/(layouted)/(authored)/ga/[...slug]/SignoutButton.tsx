"use client";

import Button from "@/components/basics/Button/Button";
import Auth from "@/lib/modules/Auth";
import { Slot } from "@radix-ui/react-slot";
import { useSearchParams } from "next/navigation";
import { ComponentProps, FC } from "react";

const SignoutButton: FC<ComponentProps<typeof Button>> = ({
  children,
  ...otherProps
}) => {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") ?? "/";

  const Comp = !!children ? Slot : Button;

  const d = () => {
    "use server";

    return Auth.signOut(callbackURL);
  };

  return (
    <Comp onClick={() => d()} {...otherProps}>
      {children ?? "Afmelden"}
    </Comp>
  );
};

export default SignoutButton;
