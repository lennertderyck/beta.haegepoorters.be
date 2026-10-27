import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";
import { SANITY_CLIENT } from "./client";

const builder = createImageUrlBuilder(SANITY_CLIENT);

const SanityImage = {
  fromSource: (source: SanityImageSource) => builder.image(source)
};

export default SanityImage;
