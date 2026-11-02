"use client";

import {
    Section,
    SectionHeader,
    SectionTitle
} from "@/components/basics/Section/Section";
import { PaymentParameters } from "@/lib/modules/Payment";
import { FC } from "react";

interface Props {
  isOpenAmount: boolean;
  recieverName: string;
  parsedPaymentParameters?: PaymentParameters;
}

const PaymentPrintGenerationSettings: FC<Props> = ({
  isOpenAmount,
  recieverName,
  parsedPaymentParameters
}) => {
  return (
    <>
      <Section className="">
        <SectionHeader>
          <SectionTitle asChild>
            <h3>Betaling</h3>
          </SectionTitle>
          {isOpenAmount && <p>Open bedrag naar {recieverName}</p>}
          {!isOpenAmount && (
            <p>
              {parsedPaymentParameters?.amount} EUR, naar {recieverName}
            </p>
          )}
        </SectionHeader>
      </Section>
      <button onClick={() => window.print()}>Print</button>
    </>
  );
};

export default PaymentPrintGenerationSettings;
