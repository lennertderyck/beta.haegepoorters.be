import Article, {
  ArticleBody,
  ArticleContent,
  ArticleDescription,
  ArticleHeader,
  ArticleHeaderContainer,
  ArticleHeaderFigure,
  ArticleTitle,
} from "@/components/basics/Article/Article";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Vraag of suggestie? Contacteer de groepsleiding van Scouts & Gidsen Haegepoorters Destelbergen.",
  alternates: { canonical: "/contact" },
};

interface Props {}

const Page: FC<Props> = () => {
  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer>
          <ArticleTitle>Contact</ArticleTitle>
          <ArticleDescription>
            Vraag? Suggestie? Laat het ons weten!
          </ArticleDescription>
        </ArticleHeaderContainer>
        <ArticleHeaderFigure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.772191531905!2d3.7631204157534572!3d51.05729407956365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c376c02393bccb%3A0x1e72273a2eee6c6a!2sScouts%20en%20Gidsen%20Haegepoorters%20Destelbergen!5e0!3m2!1snl!2sbe!4v1672183356043!5m2!1snl!2sbe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="bg-gray-100"
          />
        </ArticleHeaderFigure>
      </ArticleHeader>
      <ArticleContent>
        <ArticleBody>
          <h4>Groepsleiding contacteren?</h4>
          Je kan contact opnemen met onze groepsleiding via{" "}
          <a href="mailto:groepsleiding@haegepoorters.be">
            groepsleiding@haegepoorters.be
          </a>
          .
        </ArticleBody>
      </ArticleContent>
    </Article>
  );
};

export default Page;
