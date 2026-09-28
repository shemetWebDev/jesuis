import Image from "next/image";
import type { SanityImage as SanityImageData } from "@/src/sanity/types";

type Props = {
  image: SanityImageData;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export default function SanityImage({ image, alt, sizes, className, priority }: Props) {
  return (
    <Image
      src={image.url}
      width={image.width}
      height={image.height}
      alt={alt}
      sizes={sizes}
      className={className}
      priority={priority}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip}
    />
  );
}
