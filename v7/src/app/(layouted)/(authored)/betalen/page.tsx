import Article, {
    ArticleContent,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import PaymentGenerateForm from "@/components/ui/PaymentGenerateForm/PaymentGenerateForm";
import { PAYMENT_RECIPIENTS } from "@/lib/constants/payments";
import { parsePaymentSharableString } from "@/lib/modules/Payment";
import { FC } from "react";

interface Props {}

const Page: FC<PageProps<"/betalen">> = async ({ searchParams }) => {
  const { st } = await searchParams;

  const sharedPaymentString = st?.toString();
  const parsedPaymentString =
    sharedPaymentString === undefined
      ? undefined
      : parsePaymentSharableString(sharedPaymentString);

  const reciever = PAYMENT_RECIPIENTS.find(
    (paymentRecievers) =>
      paymentRecievers.accountNumber.replaceAll(" ", "") ===
      parsedPaymentString?.recieverAccount
  );

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Betaling aanmaken</ArticleTitle>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <PaymentGenerateForm
          defaultValue={{
            reciever: reciever?.value ?? "",
            amount: parsedPaymentString?.amount ?? null,
            description: parsedPaymentString?.description ?? "",
            isCustomAmount: parsedPaymentString?.amount === null,
            otherAccount: reciever ? parsedPaymentString?.recieverAccount : ""
          }}
        />
      </ArticleContent>
    </Article>
  );
};

export default Page;
