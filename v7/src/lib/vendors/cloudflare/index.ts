import Cloudflare from "cloudflare";

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

if (!CLOUDFLARE_API_TOKEN || CLOUDFLARE_ACCOUNT_ID) {
  throw new Error("Cloudflare parameters are missing");
}

export const cloudflareClient = new Cloudflare({
  apiToken: CLOUDFLARE_API_TOKEN!,
});

enum Namespaces {
  HAEGEPOORTERSBE = "d79be2a1e95b425ba60f9a9a25aa04fb",
}

const createKVForNamespace = async (
  namespace: keyof typeof Namespaces,
  key: string,
  value: string,
) => {
  return await cloudflareClient.kv.namespaces.values.update(key, {
    account_id: CLOUDFLARE_ACCOUNT_ID!,
    value: value,
    namespace_id: Namespaces[namespace],
  });
};
