import { Redirect } from "next/dist/lib/load-custom-routes";

export default [
  {
    source: "/old-path",
    destination: "/new-path",
    permanent: true
  }
] satisfies Redirect[];
