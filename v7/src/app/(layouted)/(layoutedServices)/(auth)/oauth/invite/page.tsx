import Button from "@/components/basics/Button/Button";
import Notice from "@/components/basics/Notice/Notice";
import { FC } from "react";

/**
 * Only shows a button: the token is consumed on POST, so link previews and
 * mail scanners that fetch this page don't use up the single-use link
 */
const Page: FC<PageProps<"/oauth/invite">> = async ({ searchParams }) => {
  const { token_hash, error } = await searchParams;

  if (typeof token_hash !== "string") {
    return <Notice>Ongeldige uitnodiging: token ontbreekt.</Notice>;
  }

  return (
    <form
      action="/oauth/invite/redeem"
      method="post"
      className="flex flex-col gap-3"
    >
      {error && <Notice>{error}</Notice>}
      <p>Je bent uitgenodigd om je aan te melden.</p>
      <input type="hidden" name="token_hash" value={token_hash} />
      <Button type="submit">Aanmelden</Button>
    </form>
  );
};

export default Page;
