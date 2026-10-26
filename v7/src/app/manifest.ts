import type { MetadataRoute } from "next";
import { SEO } from "@/lib/constants/static";

const manifest = (): MetadataRoute.Manifest => ({
  name: SEO.name.official,
  short_name: SEO.name.variant,
  description: SEO.description,
  lang: "nl",
  start_url: "/",
  display: "standalone",
  theme_color: SEO.themeColor,
  background_color: "#ffffff",
  icons: [
    { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    { src: "/apple-icon.png", sizes: "192x192", type: "image/png" },
    { src: "/icon.png", sizes: "512x512", type: "image/png" },
  ],
  shortcuts: [
    {
      name: "Haegeprekerke",
      short_name: "Haegeprekerke",
      description: "Bekijk de activiteiten voor de komende maanden",
      url: "/haegeprekerke",
    },
    {
      name: "Nieuws & blog",
      short_name: "Nieuws",
      description: "Blijf op de hoogte van wat er gebeurt op onze scouts",
      url: "/blog",
    },
    {
      name: "Digitale lidkaart",
      short_name: "Lidkaart",
      description: "Toon je digitale lidkaart",
      url: "/ga/lidkaart",
    },
  ],
});

export default manifest;
