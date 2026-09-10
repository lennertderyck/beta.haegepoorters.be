import { Geist, Geist_Mono, Podkova, Sora } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"]
});

export const podkova = Podkova({
  variable: "--font-podkova",
  subsets: ["latin"],
  weight: ["400", "700"]
});
