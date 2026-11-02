import "server-only";

import { ADMIN_API_BASE_URL } from "@/lib/constants/admin";
import Auth from "@/lib/modules/Auth";
import { getIsAuthenticatedServer } from "@/lib/modules/Auth.utils";
import CreateQueryFactory from "../../../../packages/fetch/query";

export { ADMIN_API_BASE_URL };

export const AdminQueryFactory = CreateQueryFactory(
  async () => {
    const accessToken = await Auth.accessToken;

    console.log(accessToken);

    return new Request(ADMIN_API_BASE_URL, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
    });
  },
  {
    enable: async () => await getIsAuthenticatedServer(),
    // enable: false,
  },
);

export const StoryblokQueryFactory = CreateQueryFactory(
  () => {
    const url = new URL(
      `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_API_TOKEN}`,
    );
    return new Request(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
  {
    enable: () => true,
  },
);
