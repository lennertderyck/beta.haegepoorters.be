"use client";

import { LOGO_HAEGEPOORTERS_WHITE } from "@/assets";
import Label from "@/components/basics/Label/Label";
import { cn } from "@/lib/utils/composers";
import dayjs from "dayjs";
import Image from "next/image";
import { FC } from "react";

interface Props {
  memberName: string;
  memberIdentification: string | null;
  memberFunction: string;
  firstJoined: Date | null;
}

const MembershipCard: FC<Props> = ({
  memberName,
  memberIdentification,
  memberFunction,
  firstJoined
}) => {
  return (
    <>
      <div
        className={cn(
          "relative px-8 pt-8 pb-6 aspect-[2] not-md:w-full max-w-110 rounded-2xl flex flex-col justify-between *:text-white",
          "bg-radial-[at_0%_0%] from-primary-500 via-primary-500/95 to-primary-500/80 border-primary-600 border",
          "shadow-xl"
        )}
      >
        <div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none" />
        <header>
          <h2 className="font-medium text-3xl font-serif">{memberName}</h2>
          <Label className="border border-white px-2 py-0.5  text-xs rounded-full w-fit lowercase">
            {memberFunction}
          </Label>
        </header>
        <footer className="flex gap-2 items-end justify-between">
          <div
            className={cn(
              "text-left leading-5",
              !!!memberIdentification && "opacity-50"
            )}
          >
            <p>
              <Label>
                Nr. {memberIdentification || "Lidnummer niet beschikbaar"}
              </Label>
            </p>
            <p>
              <small>Lid sinds {dayjs(firstJoined).format("DD/MM/YYYY")}</small>
            </p>
          </div>
          <Image
            src={LOGO_HAEGEPOORTERS_WHITE}
            alt="Logo Haegepoorters"
            height={45}
          />
        </footer>
      </div>
    </>
  );
};

export default MembershipCard;
