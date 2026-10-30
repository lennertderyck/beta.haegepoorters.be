"use client";

import Button from "@/components/basics/Button/Button";
import {
    Collapsible,
    CollapsibleContent
} from "@/components/basics/Collapsible/Collapsible";
import Field, { FieldLabel } from "@/components/basics/Field/Field";
import Input from "@/components/basics/Input/Input";
import Notice from "@/components/basics/Notice/Notice";
import Option, {
    OptionGroup,
    OptionIcon,
    OptionLabel
} from "@/components/basics/Option/Option";
import {
    Section,
    SectionHeader,
    SectionTitle
} from "@/components/basics/Section/Section";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/basics/Select/Select";
import {
    DEFAULT_PAYMENT_RECIPIENT,
    PAYMENT_RECIPIENTS
} from "@/lib/constants/payments";
import {
    generatePaymentQRCodeURL,
    generatePaymentSharableString
} from "@/lib/modules/Payment";

import { FC, useActionState, useState } from "react";

interface PaymentFormData {
  amount: number | null;
  description: string;
  reciever: string;
  isCustomAmount: boolean;
  otherAccount: string;
}

interface FormState {
  submitted: boolean;
  paymentData: PaymentFormData;
}

const initialState: FormState | null = {
  submitted: false,
  paymentData: {
    amount: 0,
    description: "",
    reciever: DEFAULT_PAYMENT_RECIPIENT.value,
    isCustomAmount: false,
    otherAccount: ""
  }
};

const action = async (
  _state: FormState | null,
  formData: FormData
): Promise<FormState> => {
  const amount = formData.get("amount") ? Number(formData.get("amount")) : null;
  const isCustomAmount = formData.get("isCustomAmount") === "true";

  const paymentData = {
    amount,
    description: formData.get("description") as string,
    reciever: formData.get("reciever") as string,
    isCustomAmount,
    otherAccount: formData.get("otherAccount") as string
  };

  return {
    submitted: true,
    paymentData: paymentData
  };
};

interface Props {
  defaultValue?: Partial<PaymentFormData>;
}

const PaymentGenerateForm: FC<Props> = ({ defaultValue }) => {
  const [state, dispatchAction] = useActionState(action, {
    ...initialState,
    paymentData: {
      ...initialState?.paymentData,
      ...defaultValue
    }
  });

  const [showAmount, setShowAmount] = useState(
    !state.paymentData.isCustomAmount
  );
  const [showOtherAccount, setShowOtherAccount] = useState(
    state.paymentData.reciever === "other"
  );

  const renderPaymentRecipientLabel = (value: string) =>
    PAYMENT_RECIPIENTS.find((recipient) => recipient.value === value)?.label ??
    "Selecteer een ontvanger";

  const paymentReciever = PAYMENT_RECIPIENTS.find(
    (recipient) => recipient.value === state.paymentData.reciever
  );

  const isOtherAccount =
    state.paymentData.reciever === "other" || showOtherAccount;

  const paymentParameters = {
    recieverAccount: paymentReciever
      ? paymentReciever.accountNumber.replaceAll(" ", "")
      : "NO_ACCOUNT_SPECIFIED",
    recieverName: paymentReciever
      ? `${paymentReciever.label} Haegepoorters`
      : "Onbekende ontvanger",
    recieverBic: "KREDBEBB",
    amount: state.paymentData.amount,
    description: state.paymentData.description
  };

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12 md:col-span-6">
        <form action={dispatchAction} className="not-first:[&_section]:mt-6">
          <Section>
            <SectionHeader>
              <SectionTitle>Betalingsinformatie</SectionTitle>
            </SectionHeader>
            <Field>
              <FieldLabel>Mededeling</FieldLabel>
              <Input
                type="text"
                placeholder="Omschrijving van de betaling"
                required
                name="description"
                defaultValue={state.paymentData.description}
              />
            </Field>
          </Section>
          <section>
            <Field>
              <FieldLabel>Bedrag openlaten?</FieldLabel>
              <OptionGroup className="grid grid-cols-2 w-full">
                <div className="col-span-1">
                  <Option
                    name="isCustomAmount"
                    value="false"
                    defaultChecked={!state.paymentData.isCustomAmount}
                    onChange={() => setShowAmount(true)}
                  >
                    <OptionIcon name="discount-percent-line" />
                    <OptionLabel>Vast bedrag</OptionLabel>
                  </Option>
                </div>
                <div className="col-span-1">
                  <Option
                    name="isCustomAmount"
                    value="true"
                    defaultChecked={state.paymentData.isCustomAmount}
                    onChange={() => setShowAmount(false)}
                  >
                    <OptionIcon name="hand-coin-line" />
                    <OptionLabel>Open bedrag</OptionLabel>
                  </Option>
                </div>
              </OptionGroup>
              <Collapsible open={!showAmount}>
                <CollapsibleContent origin="top">
                  <p className="leading-4 mt-3">
                    <small className="">
                      Bij een open bedrag kan de ontvanger zelf het bedrag
                      invullen en zullen de meeste betaalapps dit automatisch
                      vragen.
                    </small>
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </Field>
          </section>
          <section>
            <Field>
              <Collapsible open={showAmount}>
                <CollapsibleContent>
                  <FieldLabel>Bedrag</FieldLabel>
                  <Input
                    type="number"
                    name="amount"
                    placeholder="Vul het bedrag in"
                    required={!state.paymentData.isCustomAmount}
                    defaultValue={state.paymentData.amount || ""}
                  />
                </CollapsibleContent>
              </Collapsible>
            </Field>
          </section>
          <section>
            <Field>
              <FieldLabel>Ontvanger</FieldLabel>
              <Select
                name="reciever"
                defaultValue={state.paymentData.reciever}
                onValueChange={(value) =>
                  setShowOtherAccount(value === "other")
                }
              >
                <SelectTrigger>
                  <SelectValue>{renderPaymentRecipientLabel}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_RECIPIENTS.filter(
                    (recipient) => recipient.features.generatePayments
                  ).map((recipient) => (
                    <SelectItem key={recipient.value} value={recipient.value}>
                      {recipient.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Collapsible open={isOtherAccount}>
              <CollapsibleContent>
                <div className="mt-4">
                  <Field>
                    <FieldLabel>Rekeningnummer</FieldLabel>
                    <Input
                      type="text"
                      name="otherAccount"
                      placeholder="Vul het rekeningnummer in"
                      defaultValue={state.paymentData.otherAccount}
                      required={isOtherAccount}
                    />
                  </Field>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>
          <Button type="submit" className="mt-6">
            Genereer betaling
          </Button>
        </form>
      </div>
      <div className="col-span-12 md:col-span-6">
        <Section>
          <SectionHeader>
            <SectionTitle>Scan de QR-code</SectionTitle>
          </SectionHeader>
          {!state.submitted && (
            <>
              <Notice>
                Genereer een betaling door het formulier in te vullen.
              </Notice>
            </>
          )}
          {state.submitted && (
            <>
              <img src={generatePaymentQRCodeURL(paymentParameters)} />
              <p className="mt-4">
                {generatePaymentSharableString(paymentParameters)}
              </p>
            </>
          )}
        </Section>
      </div>
    </div>
  );
};

export default PaymentGenerateForm;
