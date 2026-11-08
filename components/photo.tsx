import type { ImgHTMLAttributes } from "react";
import { imageSources } from "@/lib/media";
/** All rendered photographs are bundled locally; rendering needs no third-party host. */
export function Photo(props: ImgHTMLAttributes<HTMLImageElement>) {
  const key =
    typeof props.src === "string"
      ? props.src
          .split("/")
          .pop()
          ?.replace(/\.(jpg|png)$/, "") || ""
      : "";
  const src = imageSources[key] || props.src;
  return <img {...props} src={src} />;
}
