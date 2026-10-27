import { LOGO_GROEPSADMINISTRATIE } from "@/assets";
import Article, {
    ArticleContent,
    ArticleDescription,
    ArticleHeader,
    ArticleHeaderContainer,
    ArticleTitle
} from "@/components/basics/Article/Article";
import Button from "@/components/basics/Button/Button";
import Icon from "@/components/basics/Icon/Icon";
import { cn } from "@/lib/utils/composers";
import Image from "next/image";
import { FC } from "react";
import { composeCallbackURL } from "../../../../../packages/auth/utils";
import SigninButton from "./SigninButton";

interface Props {}

const Page: FC<PageProps<"/auth/signin">> = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams;

  const composedCallbackURL = composeCallbackURL(callbackUrl).toString();

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeaderContainer className="text-center">
          <ArticleTitle>Welkom terug!</ArticleTitle>
          <ArticleDescription>Meld je aan om verder te gaan</ArticleDescription>
        </ArticleHeaderContainer>
      </ArticleHeader>
      <ArticleContent>
        <SigninButton provider="keycloak" callbackURL={composedCallbackURL}>
          <button className="relative flex flex-col gap-5 md:flex-row items-center justify-between border-2 border-gray-50 p-8 shadow-lg rounded-lg w-full ">
            <div
              className={cn(
                "flex flex-col md:flex-row items-center gap-2 md:gap-8",
                "*:text-center md:*:text-left"
              )}
            >
              <Image
                alt="Groepsadministratie Logo"
                src={LOGO_GROEPSADMINISTRATIE}
                className="w-24 mb-3 lg:mb-0 select-none"
              />
              <div className="text-left">
                <p className="font-serif font-bold text-2xl leading-6">
                  Aanmelden bij Groepsadministratie
                </p>
                <p className="font-medium">Voor leden en ouders</p>
              </div>
            </div>
            <div className="bg-neutral-50 p-2 rounded-full">
              <Icon name="arrow-right-line" />
            </div>
            <div className="invisible in-data-[pending=true]:visible absolute inset-0 p-2 bg-white/50 backdrop-blur-xs flex items-center justify-center transition-opacity duration-300">
              <Icon name="loader-2-line" className="animate-spin" size="2rem" />
            </div>
          </button>
        </SigninButton>
        <SigninButton provider="supabase" callbackURL={composedCallbackURL}>
          <Button className="block mx-auto mt-8" variant="tertiary">
            Of aanmelden als webmaster
            <Icon name="arrow-right-line" />
          </Button>
        </SigninButton>
      </ArticleContent>
    </Article>
  );
};

export default Page;
