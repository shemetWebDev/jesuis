import type { ProductCard } from "@/src/sanity/types";
import SanityImage from "../sanityImage/SanityImage";
import PhotoPlaceholder from "../photoPlaceholder/PhotoPlaceholder";

import "./styles.scss";

type Props = {
  product: Pick<ProductCard, "title" | "cover" | "coverVideoUrl">;
  placeholder: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

// Видео-обложка (зациклена, без звука) → картинка → заглушка
export default function ProductCover({ product, placeholder, sizes, className, priority }: Props) {
  if (product.coverVideoUrl) {
    return (
      <video
        className={`product-cover ${className ?? ""}`}
        src={product.coverVideoUrl}
        poster={product.cover?.url}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={product.title}
      />
    );
  }

  if (product.cover) {
    return (
      <SanityImage
        image={product.cover}
        alt={product.title}
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  return <PhotoPlaceholder label={placeholder} />;
}
