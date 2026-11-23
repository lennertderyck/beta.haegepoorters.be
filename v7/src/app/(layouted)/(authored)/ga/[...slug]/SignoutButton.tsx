"use client";

import Button from "@/components/basics/Button/Button";
import { Slottable } from "@radix-ui/react-slot";
import { useRouter, useSearchParams } from "next/navigation";
import { ComponentProps, FC } from "react";

const SignoutButton: FC<ComponentProps<typeof Button>> = ({
  children,
  ...otherProps
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const Comp = !!children ? Slottable : Button;

  const handleSignout = () => {
    const params = new URLSearchParams({ callbackUrl });
    router.push(`/auth/signout?${params}`);
  };

  return (
    <Comp onClick={handleSignout} {...otherProps}>
      {children ?? "Afmelden"}
    </Comp>
  );
};

export default SignoutButton;
