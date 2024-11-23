import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: 'vlef6i8p',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_API_TOKEN
})