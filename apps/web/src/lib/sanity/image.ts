import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageAsset } from "./sanity.types";

import { dataset, projectId } from "./api";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: SanityImageAsset) => {
  return imageBuilder.image(source).auto("format").fit("max");
};
