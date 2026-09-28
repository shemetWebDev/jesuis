import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import VideoEmbed from "../videoEmbed/VideoEmbed";

import "./styles.scss";

export default function VideoSection({ url }: { url?: string }) {
  const t = useTranslations("video");

  return (
    <section className="section video-section">
      <div className="container">
        <div className="video-section__head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="lead">{t("text")}</p>
        </div>
        <VideoEmbed url={url} title={t("title")} placeholder={t("placeholder")} />
        <div className="video-section__cta">
          <Link href="/products" className="btn btn--outline">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
