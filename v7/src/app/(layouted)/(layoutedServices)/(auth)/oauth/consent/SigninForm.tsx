import Button from "@/components/basics/Button/Button";
import Input from "@/components/basics/Input/Input";
import { FC } from "react";

interface Props {
  authorizationId: string;
}

const SigninForm: FC<Props> = ({ authorizationId }) => (
  <form
    action="/oauth/consent/signin"
    method="post"
    className="flex flex-col gap-3"
  >
    <input type="hidden" name="authorization_id" value={authorizationId} />
    <Input
      name="email"
      type="email"
      placeholder="E-mail"
      autoComplete="email"
      required
    />
    <Input
      name="password"
      type="password"
      placeholder="Wachtwoord"
      autoComplete="current-password"
      required
    />
    <Button type="submit">Aanmelden</Button>
  </form>
);

export default SigninForm;
