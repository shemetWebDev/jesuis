import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/src/i18n/routing";
import { Link } from "@/src/i18n/navigation";
import { fetchSettings } from "@/src/sanity/fetch";
import PhotoPlaceholder from "@/src/components/photoPlaceholder/PhotoPlaceholder";
import VideoSection from "@/src/components/sections/VideoSection";
import LeadForm from "@/src/components/leadForm/LeadForm";

import "./styles.scss";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("intro") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tWho, tBrand, settings] = await Promise.all([
    getTranslations("about"),
    getTranslations("who"),
    getTranslations("brand"),
    fetchSettings(),
  ]);

  return (
    <>
      <section className="about">
        <div className="container about__inner">
          <div className="about__photo">
            {/* TODO: фото автора */}
            <PhotoPlaceholder label={tBrand("name")} />
          </div>

          <div className="about__content">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1 className="page-head__title">{t("title")}</h1>
            <p className="about__intro">{t("intro")}</p>
            <p className="about__who">{tWho("title")}</p>
            <p>{tWho("text")}</p>
            <p>{tWho("path")}</p>
            <p className="about__story">{t("story")}</p>
            <p className="about__sign">
              {tBrand("name")} · {tBrand("role")}
            </p>
            <Link href="/products" className="btn btn--primary">
              {t("cta")}
            </Link>
          </div>
        </div>
      </section>

      <VideoSection url={settings.introVideoUrl} />
      <LeadForm />
    </>
  );
}
