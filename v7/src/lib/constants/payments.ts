interface PaymentRecipient {
  value: string;
  label: string;
  accountNumber: string;
  features: {
    /** Indicates whether this recipient supports generating payments on the payments page */
    generatePayments: boolean;
  };
}

export const PAYMENT_RECIPIENTS: PaymentRecipient[] = [
  {
    value: "grp",
    label: "Groepskas",
    accountNumber: "BE18736031389365",
    features: {
      generatePayments: true
    }
  },
  {
    value: "kap",
    label: "Kapoenen",
    accountNumber: "BE71736031389769",
    features: {
      generatePayments: true
    }
  },
  {
    value: "wel",
    label: "Welpen",
    accountNumber: "BE38 7360 3139 0072",
    features: {
      generatePayments: true
    }
  },
  {
    value: "wol",
    label: "Woudlopers",
    accountNumber: "BE16 7360 3139 0274",
    features: {
      generatePayments: true
    }
  },
  {
    value: "jgv",
    label: "Jonggivers",
    accountNumber: "BE91 7360 3139 0476",
    features: {
      generatePayments: true
    }
  },
  {
    value: "giv",
    label: "Givers",
    accountNumber: "BE80 7360 3139 0577",
    features: {
      generatePayments: true
    }
  },
  {
    value: "kld",
    label: "Team kledij",
    accountNumber: "BE47 7360 3139 0880",
    features: {
      generatePayments: true
    }
  },
  {
    value: "stm",
    label: "Stam HP",
    accountNumber: "BE58 7360 3139 0779",
    features: {
      generatePayments: true
    }
  },
  {
    value: "mat",
    label: "Materiaal",
    accountNumber: "BE70 7390 1764 6725",
    features: {
      generatePayments: false
    }
  },
  {
    value: "other",
    label: "Andere rekening",
    accountNumber: "",
    features: {
      generatePayments: true
    }
  }
];

export const DEFAULT_PAYMENT_RECIPIENT: PaymentRecipient =
  PAYMENT_RECIPIENTS[0];

export const PAYMENT_SUPPORTED_APPS = [
  {
    label: "KBC",
    iconSrc:
      "https://play-lh.googleusercontent.com/AkRITJFeOLctUbSmqqg3yJ5bGT0wTqz4drRxE3-l5XYu7ChG4rZihN70DQ8UzD4clw=w480-h960-rw"
  },
  {
    label: "Argenta",
    iconSrc:
      "https://play-lh.googleusercontent.com/Qpl8t2yJhMjSHaeyZX8cs5cIV8AePg2Qj726-Zt5IlvPJie1H-E5ipvUhsJ7i2tRWKU=w480-h960-rw"
  },
  {
    label: "Belfius",
    iconSrc:
      "https://play-lh.googleusercontent.com/-2Ig9a2k3CIZHJqKcjuPUEu7Z7AoAVqLGyuOdK_-awx5q7Y9bq8PfTcYkeR0eYWqOv0=w480-h960-rw"
  },
  {
    label: "ING",
    iconSrc:
      "https://play-lh.googleusercontent.com/7_nknvByeVGfQ7XhrY15nlOEbRKJuMmALD7QMtKWS6HS8v4ip5mVbWTX4RVvrwFDSg=w480-h960-rw"
  },
  {
    label: "BNP Paribas",
    iconSrc:
      "https://play-lh.googleusercontent.com/863gXOcEJwXQ9c56Qfk5fznn_h50t5EL4xvdhIQTbM71vr4uTB19AM24QLMoKl784HP-=w480-h960-rw"
  },
  {
    label: "VDK",
    iconSrc:
      "https://play-lh.googleusercontent.com/6WPVi9ORGpfUqmKAXKoCzIQsHtwHD1YNZ85dVWgkKpg98xhOt63Rj4jCDP1rcNg1u0c=w480-h960-rw"
  }
];
