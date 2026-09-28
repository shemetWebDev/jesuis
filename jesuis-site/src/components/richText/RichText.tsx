import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import "./styles.scss";

type BodyImage = {
  url?: string;
  width?: number;
  height?: number;
  caption?: string;
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: BodyImage }) => {
      if (!value.url || !value.width || !value.height) return null;
      return (
        <figure className="rich-text__figure">
          <Image
            src={value.url}
            width={value.width}
            height={value.height}
            alt={value.caption ?? ""}
            sizes="(max-width: 800px) 100vw, 720px"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
          {children}
        </a>
      );
    },
  },
};

export default function RichText({ value }: { value: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="rich-text">
      <PortableText value={value} components={components} />
    </div>
  );
}
