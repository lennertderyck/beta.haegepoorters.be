export interface PaymentParameters {
  recieverAccount: string;
  recieverName: string;
  recieverBic: string;
  /** The amount to be transferred. If null, the amount is left open and can be specified by the payer. */
  amount: number | null;
  description: string;
}

const generatePaymentQRCodeValue = (parameters: PaymentParameters) => {
  /** An empty string used to indicate that the payment amount is left open. */
  const OPEN_AMOUNT_PAYMENT_VALUE_PARAMETER = "" as const;

  const dataParts = [
    "BCD",
    "002",
    "1",
    "SCT",
    parameters.recieverBic,
    parameters.recieverName,
    parameters.recieverAccount.replaceAll(" ", ""),
    parameters.amount !== null
      ? parameters.amount.toFixed(2)
      : OPEN_AMOUNT_PAYMENT_VALUE_PARAMETER,
    "", // keep spacer for correct parsing by service
    parameters.description
  ];

  return dataParts;
};

export const generatePaymentSharableString = (
  parameters: PaymentParameters
) => {
  const recieverAccount = parameters.recieverAccount.replaceAll(" ", "");
  const amount = parameters.amount !== null ? parameters.amount.toFixed(2) : "";

  return [
    "V1",
    parameters.recieverBic,
    parameters.recieverName,
    recieverAccount,
    amount,
    parameters.description.includes(":")
      ? `"${parameters.description}"`
      : parameters.description
  ].join(":");
};

export const parsePaymentSharableString = (
  sharableString: string
): PaymentParameters => {
  const [
    _version,
    recieverBic,
    recieverName,
    recieverAccount,
    amount,
    description
  ] = sharableString.split(":");

  return {
    recieverBic,
    recieverName,
    recieverAccount,
    amount: amount !== "" ? parseFloat(amount) : null,
    description
  };
};

export const generatePaymentQRCodeURL = (parameters: PaymentParameters) => {
  const separator = "%0a";
  const dataParts = generatePaymentQRCodeValue(parameters);
  const urlBase = "https://barcode.tec-it.com/barcode.ashx";

  const encodedData = encodeURIComponent(dataParts.join("\n"));

  const params = {
    code: "EPCQRCode",
    data: dataParts.join(separator),
    backcolor: "%23ffffff",
    method: "image"
  };

  const searchParams = Object.entries(params)
    .map((param) => param.join("="))
    .join("&");

  return urlBase + "?" + searchParams;
};
