import { redirect } from "next/navigation";

const Auth = {
  signInAgain: (callbackUrl: string) => {
    const params = new URLSearchParams({
      callbackUrl
    });

    redirect("/auth/signin" + "?" + params.toString());
  }
};

export default Auth;
