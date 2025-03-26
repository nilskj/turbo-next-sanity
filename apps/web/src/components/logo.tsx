import Image from "next/image";
import Link from "next/link";

import type { Maybe, SanityImageProps } from "@/types";

import { SanityImage } from "./sanity-image";

const LOGO_URL =
  "https://cdn.sanity.io/images/s6kuy1ts/production/68c438f68264717e93c7ba1e85f1d0c4b58b33c2-1200x621.svg";

interface LogoProps {
  src?: Maybe<string>;
  image?: Maybe<SanityImageProps>;
  alt?: Maybe<string>;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function Logo({
  src,
  alt = "logo",
  image,
  width = 170,
  height = 40,
  priority = true,
  className,
}: LogoProps) {
  // If we have an image from Sanity or a src URL, use the image
  if (image || src) {
    return (
      <Link href="/" className={className}>
        {image ? (
          <SanityImage
            asset={image}
            alt={alt ?? "logo"}
            width={width}
            className="w-auto h-auto dark:invert"
            height={height}
            priority={priority}
            loading="eager"
            decoding="sync"
            quality={100}
          />
        ) : (
          <Image
            src={src ?? LOGO_URL}
            alt={alt ?? "logo"}
            width={width}
            className="w-auto h-auto dark:invert"
            height={height}
            loading="eager"
            priority={priority}
            decoding="sync"
          />
        )}
      </Link>
    );
  }

  // If no image, use a text logo with Playfair Display font
  return (
    <Link href="/" className={className}>
      <span className="font-serif font-bold text-2xl text-zinc-900 dark:text-white">
        {alt || "Roe Horvat"}
      </span>
    </Link>
  );
}
