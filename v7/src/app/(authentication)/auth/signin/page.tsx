import { localServerAuth } from "@/lib/vendors/better-auth/local/server";
import { FC } from "react";
import { composeCallbackURL } from "../../../../../packages/auth/utils";
import SigninButton from "./SigninButton";

interface Props {}

const Page: FC<PageProps<"/auth/signin">> = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams;

  const composedCallbackURL = composeCallbackURL(
    String(callbackUrl) || ""
  ).toString();

  const signin = async (formData: FormData) => {
    "use server";

    try {
      const response = await localServerAuth.api.signInEmail({
        body: {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          callbackURL: composedCallbackURL
        },
        asResponse: true
      });
      console.log({ response });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SigninButton callbackURL={composedCallbackURL} />
      <form action={signin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default Page;
