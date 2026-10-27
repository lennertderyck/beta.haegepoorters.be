"use client";

import Link from "next/link";
import { type ComponentProps, type FC, useRef } from "react";
import Button from "@/components/basics/Button/Button";
import Card, { CardContent, CardHeader } from "@/components/basics/Card/Card";
import Icon from "@/components/basics/Icon/Icon";
import type { CmsStaff } from "@/lib/actions/queries/staff";
import { STAFFMEMBER_CONTACT_METHODS } from "@/lib/constants/contact";

interface Props extends ComponentProps<typeof Button> {
  staffMember: CmsStaff;
}

const StaffContactModalButton: FC<Props> = ({
  staffMember: staff,
  onClick,
  ...buttonProps
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button
        onClick={(event) =>
          dialogRef.current?.showModal() &&
          dialogRef.current?.focus() &&
          onClick?.(event)
        }
        {...buttonProps}
      />
      <dialog
        ref={dialogRef}
        aria-labelledby="staff-contact-dialog-title"
        className="m-auto w-full max-w-full h-full max-h-full border-0 bg-transparent shadow-xl backdrop:bg-black/50 open:flex items-center justify-center"
      >
        <div className="relative not-md:mt-auto md:max-w-lg h-fit md:max-h-3/6 bg-white p-8">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute top-4 right-4"
          >
            <Icon name="close-line" />
          </button>
          <header className="mb-4">
            <h3 className="font-serif text-2xl font-bold">
              {staff.firstName} contacteren
            </h3>
            <p>
              Kies een van de onderstaande manieren om contact op te nemen met{" "}
              {staff.firstName}.
            </p>
          </header>
          <ul>
            {STAFFMEMBER_CONTACT_METHODS.map((method) => (
              <li key={method.type}>
                <Link href={method.hrefBase + staff.phoneNumber}>
                  <Card className="flex items-center" sizing="compact">
                    <CardContent>
                      <CardHeader>{method.description}</CardHeader>
                    </CardContent>
                    <div className="bg-neutral-50 p-2 rounded-full">
                      <Icon name="arrow-right-line" />
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
};

export default StaffContactModalButton;
