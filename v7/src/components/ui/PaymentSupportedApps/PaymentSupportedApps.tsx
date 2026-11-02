import Label from "@/components/basics/Label/Label";
import { PAYMENT_SUPPORTED_APPS } from "@/lib/constants/payments";
import Image from "next/image";
import { FC } from "react";

interface Props {}

const PaymentSupportedApps: FC<Props> = () => {
  return (
    <>
      <p className="text-center mb-5">
        <Label>Ondersteunde bank-apps</Label>
      </p>
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {PAYMENT_SUPPORTED_APPS.map((app) => (
          <Image
            key={app.label}
            src={app.iconSrc}
            className="h-8 rounded-md"
            alt={`logo ${app.label}`}
            height={35}
            width={35}
          />
        ))}
      </div>
      <p className="text-center mt-5">Payconiq wordt niet ondersteund</p>
    </>
  );
};

export default PaymentSupportedApps;
