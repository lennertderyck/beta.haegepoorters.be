import { ADMIN_API_BASE_URL } from "@/lib/constants/admin";
import { authMemory } from "@/lib/initializer";
import CreateQueryFactory from "../../../../packages/fetch/query";

export { ADMIN_API_BASE_URL };

export const AdminQueryFactory = CreateQueryFactory(
  () => {
    const accessToken = authMemory.accessToken;

    return new Request(ADMIN_API_BASE_URL, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json"
      }
    });
  },
  {
    enable: () => authMemory.isAuthenticated
  }
);

export const StoryblokQueryFactory = CreateQueryFactory(
  () => {
    const url = new URL(
      `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_API_TOKEN}`
    );
    return new Request(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  },
  {
    enable: () => true
  }
);
