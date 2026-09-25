"use client";

import Button from "@/components/basics/Button/Button";
import Auth from "@/lib/modules/Auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface Props {}

const ReauthorizeButton: FC<Props> = () => {
  const location = usePathname();
  const router = useRouter();
  const search = useSearchParams();

  const callbackUrl =
    location + (search.toString() ? "?" + search.toString() : "");

  return (
    <>
      <Button onClick={() => Auth.signInAgain(callbackUrl)}>
        Opnieuw aanmelden
      </Button>
    </>
  );
};

export default ReauthorizeButton;
