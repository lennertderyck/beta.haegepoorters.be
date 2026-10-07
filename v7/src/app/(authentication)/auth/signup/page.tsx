import { keycloakServerAuth } from "@/lib/vendors/better-auth/keycloak/server";
import { FC } from "react";

const AUTH_URL_ORIGIN = process.env.NEXT_PUBLIC_AUTH_URL;

interface Props {}

const Page: FC<Props> = async () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    console.log(Object.fromEntries(formData.entries()));

    try {
      const response = await keycloakServerAuth.api.signUpEmail({
        body: {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          name: formData.get("name") as string,
          callbackURL: AUTH_URL_ORIGIN + "/callback"
        },
        asResponse: true
      });
      console.log({ response });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <form action={handleSubmit}>
      <input name="name" type="text" placeholder="Name" autoComplete="name" />
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Page;
