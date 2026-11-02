"use client";

import SanityImage from "@/lib/vendors/sanity/images";
import { SanityImageSource } from "@sanity/image-url";
import Image, { ImageLoaderProps, ImageProps } from "next/image";
import { FC } from "react";

const SRC_FALLBACK = "https://singlecolorimage.com/get/d6d6d6/100x100";

const sanityLoader =
  (sanitySource: SanityImageSource | null) =>
  ({ src, width, quality }: ImageLoaderProps) =>
    sanitySource
      ? SanityImage.fromSource(sanitySource)
          .width(width)
          .quality(quality ?? 75)
          .auto("format")
          .url()
      : SRC_FALLBACK;

const StaffCardFigure: FC<
  { sanitySource: SanityImageSource | null } & Omit<
    ImageProps,
    "src" | "loader"
  >
> = ({ sanitySource, ...otherProps }) => {
  return (
    <Image
      src={SRC_FALLBACK}
      loader={sanityLoader(sanitySource)}
      {...otherProps}
    />
  );
};

export default StaffCardFigure;
