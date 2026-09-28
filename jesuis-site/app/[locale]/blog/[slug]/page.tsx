import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/src/i18n/routing";
import { Link } from "@/src/i18n/navigation";
import { fetchOtherPosts, fetchPost } from "@/src/sanity/fetch";
import SanityImage from "@/src/components/sanityImage/SanityImage";
import RichText from "@/src/components/richText/RichText";
import PostsPreview from "@/src/components/sections/PostsPreview";
import { ArrowIcon } from "@/src/components/icons/Icons";

import "./styles.scss";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchPost(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      images: post.cover ? [post.cover.url] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [t, format, post, otherPosts] = await Promise.all([
    getTranslations("blog"),
    getFormatter(),
    fetchPost(locale, slug),
    fetchOtherPosts(locale, slug),
  ]);
  if (!post) notFound();

  return (
    <>
      <article className="post-page">
        <header className="container-text post-page__head">
          <Link href="/blog" className="back-link">
            <ArrowIcon back /> {t("back")}
          </Link>
          <time className="post-page__date" dateTime={post.publishedAt}>
            {format.dateTime(new Date(post.publishedAt), {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <h1 className="post-page__title">{post.title}</h1>
          {post.excerpt && <p className="lead">{post.excerpt}</p>}
        </header>

        {post.cover && (
          <div className="container post-page__cover">
            <SanityImage image={post.cover} alt={post.title} sizes="(max-width: 1440px) 100vw, 1360px" priority />
          </div>
        )}

        <div className="container-text">
          <RichText value={post.body} />
        </div>
      </article>

      <PostsPreview posts={otherPosts} title={t("more")} />
    </>
  );
}
