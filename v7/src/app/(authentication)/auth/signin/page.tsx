import { localServerAuth } from "@/lib/vendors/better-auth/local/server";
import { FC } from "react";
import SigninButton from "./SigninButton";

interface Props {}

const Page: FC<Props> = () => {
  const signin = async (formData: FormData) => {
    "use server";

    try {
      const response = await localServerAuth.api.signInEmail({
        body: {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          callbackURL: "/callback"
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
      <SigninButton />
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
