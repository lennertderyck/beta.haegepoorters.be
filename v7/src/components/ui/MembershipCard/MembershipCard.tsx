"use client";

import Label from "@/components/basics/Label/Label";
import { GroepsadministratieFunction } from "@/lib/actions/queries/person";
import { cn } from "@/lib/utils/composers";
import dayjs from "dayjs";
import { FC } from "react";

interface Props {
  memberName: string;
  memberIdentification: string | null;
  firstJoinedDate: Date | null;
  activeUntilDate: Date;
  activeFunctions: GroepsadministratieFunction[];
}

const MembershipCard: FC<Props> = ({
  memberName,
  memberIdentification,
  firstJoinedDate,
  activeUntilDate,
  activeFunctions
}) => {
  return (
    <>
      <div className="relative px-8 pt-8 pb-6 aspect-[2] not-md:w-full max-w-110 rounded-2xl flex flex-col justify-end gap-3 bg-radial-[at_0%_0%] from-primary-500 via-primary-500/95 to-primary-500/80 shadow-xl  *:text-white">
        <div className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none"></div>
        <header className="flex flex-col gap-4 mt-8">
          <div className="text-5xl leading-5">⚜️</div>
          <h2 className="font-medium text-3xl font-serif">{memberName}</h2>
        </header>
        <div className="flex gap-2 items-center justify-between">
          <div
            className={cn(
              "text-left leading-4",
              !!!memberIdentification && "opacity-50"
            )}
          >
            <p>
              <Label>
                {memberIdentification || "Lidnummer niet beschikbaar"}
              </Label>
            </p>
            <p>
              <small>
                Lid sinds {dayjs(firstJoinedDate).format("DD/MM/YYYY")}
              </small>
            </p>
          </div>
          <Label className="border border-white px-2 py-0.5  text-xs rounded-full w-fit lowercase">
            {activeFunctions[0]?.omschrijving}
          </Label>
        </div>
      </div>
    </>
  );
};

export default MembershipCard;
