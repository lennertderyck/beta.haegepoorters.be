"use client";

import Button from "@/components/basics/Button/Button";
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
      <Button
        onClick={() =>
          router.push(`/auth/signin?${new URLSearchParams({ callbackUrl })}`)
        }
      >
        Meld je (opnieuw) aan
      </Button>
    </>
  );
};

export default ReauthorizeButton;
