import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import type { PostCard as PostCardData } from "@/src/sanity/types";
import PostCard from "../postCard/PostCard";
import { ArrowIcon } from "../icons/Icons";

import "./styles.scss";

export default function PostsPreview({
  posts,
  title,
}: {
  posts: PostCardData[];
  title?: string;
}) {
  const t = useTranslations("blog");

  if (!posts.length && title) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            {!title && <span className="eyebrow">{t("eyebrow")}</span>}
            <h2 className="section-title">{title ?? t("title")}</h2>
          </div>
          <Link href="/blog" className="link-arrow">
            {t("viewAll")} <ArrowIcon />
          </Link>
        </div>

        {posts.length ? (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="empty-note">{t("empty")}</p>
        )}
      </div>
    </section>
  );
}
