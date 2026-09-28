import { useFormatter, useTranslations } from "next-intl";

import { Link } from "@/src/i18n/navigation";
import type { PostCard as PostCardData } from "@/src/sanity/types";
import SanityImage from "../sanityImage/SanityImage";
import PhotoPlaceholder from "../photoPlaceholder/PhotoPlaceholder";

import "./styles.scss";

const baseClassName = "post-card";

export default function PostCard({ post }: { post: PostCardData }) {
  const t = useTranslations("blog");
  const format = useFormatter();
  const href = `/blog/${post.slug}`;

  return (
    <article className={baseClassName}>
      <Link href={href} className={`${baseClassName}__media`} tabIndex={-1}>
        {post.cover ? (
          <SanityImage
            image={post.cover}
            alt={post.title}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`${baseClassName}__img`}
          />
        ) : (
          <PhotoPlaceholder label={t("title")} />
        )}
      </Link>

      <time className={`${baseClassName}__date`} dateTime={post.publishedAt}>
        {format.dateTime(new Date(post.publishedAt), {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
      <h3 className={`${baseClassName}__title`}>
        <Link href={href}>{post.title}</Link>
      </h3>
      {post.excerpt && <p className={`${baseClassName}__excerpt`}>{post.excerpt}</p>}
      <Link href={href} className={`link-arrow ${baseClassName}__more`}>
        {t("read")}
      </Link>
    </article>
  );
}
