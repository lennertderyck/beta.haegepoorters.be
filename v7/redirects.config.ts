import { Redirect } from "next/dist/lib/load-custom-routes";

export default [
  {
    source: "/old-path",
    destination: "/new-path",
    permanent: true,
  },
  // Old site's manifest; without this it falls into the catch-all page
  {
    source: "/manifest.json",
    destination: "/manifest.webmanifest",
    permanent: true,
  },
] satisfies Redirect[];
