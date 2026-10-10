"use client";

import { useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import type { SanityImage } from "@/src/sanity/types";
import VideoEmbed from "../videoEmbed/VideoEmbed";
import VideoFile from "../videoEmbed/VideoFile";

import "./styles.scss";

type Props = {
  url?: string;
  fileUrl?: string;
  poster?: SanityImage;
};

// Видео-знакомство: загруженный файл важнее ссылки YouTube / Vimeo
export default function VideoSection({ url, fileUrl, poster }: Props) {
  const t = useTranslations("video");

  // Пока файл не загрузил метаданные, пропорции подсказывает заставка
  const [ratio, setRatio] = useState<number | undefined>(
    poster?.url ? poster.width / poster.height : undefined,
  );
  const isVertical = Boolean(fileUrl && ratio && ratio < 1);

  return (
    <section className={clsx("section video-section", isVertical && "video-section--vertical")}>
      <div className="container video-section__inner">
        <div className="video-section__head">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="lead">{t("text")}</p>
        </div>

        <div className="video-section__media">
          {fileUrl ? (
            <VideoFile
              src={fileUrl}
              title={t("title")}
              poster={poster?.url ? `${poster.url}?w=1000&auto=format` : undefined}
              ratio={ratio}
              onRatio={setRatio}
            />
          ) : (
            <VideoEmbed url={url} title={t("title")} placeholder={t("placeholder")} />
          )}
        </div>

        <div className="video-section__cta">
          <Link href="/products" className="btn btn--outline">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
