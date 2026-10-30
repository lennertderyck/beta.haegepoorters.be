import Article, {
    ArticleBody,
    ArticleContent,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleSubtitle,
    ArticleTitle
} from "@/components/basics/Article/Article";
import {
    Section,
    SectionHeader,
    SectionTitle
} from "@/components/basics/Section/Section";
import PaymentSupportedApps from "@/components/elements/PaymentSupportedApps/PaymentSupportedApps";
import { PAYMENT_RECIPIENTS } from "@/lib/constants/payments";
import {
    generatePaymentQRCodeURL,
    parsePaymentSharableString
} from "@/lib/modules/Payment";
import { FC } from "react";

const Page: FC<PageProps<"/betalen/print">> = async ({ searchParams }) => {
  const { st } = await searchParams;

  const sharedPaymentString = st?.toString();
  const parsedPaymentParameters =
    sharedPaymentString === undefined
      ? undefined
      : parsePaymentSharableString(sharedPaymentString);

  const reciever = PAYMENT_RECIPIENTS.find(
    (paymentRecievers) =>
      paymentRecievers.accountNumber.replaceAll(" ", "") ===
      parsedPaymentParameters?.recieverAccount
  );

  const isOpenAmount: true | false = true;
  const paymentQRCodeImageSource =
    parsedPaymentParameters === undefined
      ? null
      : generatePaymentQRCodeURL(parsedPaymentParameters);

  const STEPS = [
    {
      title: "Open je banking-app",
      description: null
    },
    {
      title: "Scan de QR-code",
      description: null,
      content: paymentQRCodeImageSource ? (
        <>
          <img
            src={paymentQRCodeImageSource}
            alt="QR code for payment"
            className="block mx-auto text-center"
          />
        </>
      ) : null
    },
    {
      ...(isOpenAmount
        ? {
            title: "Controleer de gegevens en bevestig",
            description: "Indien nodig pas je bedrag aan"
          }
        : {
            title: "Vul het gevraagde bedrag in",
            description: "Indien nodig pas je bedrag aan"
          })
    }
  ];

  return (
    <body className="h-full flex items-center justify-center">
      <Article>
        <ArticleHeader>
          <ArticleHeaderContainer>
            <ArticleTitle className="text-center">
              Drankkaart 5 euro
            </ArticleTitle>
            <ArticleSubtitle className="text-center">
              Betaal met je smartphone
            </ArticleSubtitle>
          </ArticleHeaderContainer>
        </ArticleHeader>
        <ArticleContent>
          <ArticleBody>
            {STEPS.map((step, index) => (
              <Section key={index} className="*:text-center mb-12">
                <SectionHeader className="mb-0">
                  <SectionTitle asChild>
                    <h2 className="justify-center">Stap {index + 1}</h2>
                  </SectionTitle>
                </SectionHeader>
                <h3>{step.title}</h3>
                {step.description && <p>{step.description}</p>}
                {step.content && <div className="mt-4">{step.content}</div>}
              </Section>
            ))}
            <div className="mt-12">
              <PaymentSupportedApps />
            </div>
          </ArticleBody>
        </ArticleContent>
      </Article>
    </body>
  );
};

export default Page;
