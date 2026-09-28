import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import PhotoPlaceholder from "../photoPlaceholder/PhotoPlaceholder";

import "./styles.scss";

export default function Hero() {
  const t = useTranslations("hero");
  const tBrand = useTranslations("brand");

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow">JE SUIS · {tBrand("name")}</span>
          <h1 className="hero__title">{t("title")}</h1>
          <p className="hero__lead">{t("lead")}</p>
          <p className="hero__text">{t("text")}</p>
          <div className="hero__actions">
            <Link href="/about" className="btn btn--primary">
              {t("ctaAbout")}
            </Link>
            <Link href="/products" className="btn btn--outline">
              {t("ctaProducts")}
            </Link>
          </div>
        </div>

        <div className="hero__photo">
          {/* TODO: заменить на фото автора, когда появится */}
          <PhotoPlaceholder label={t("photo")} />
        </div>
      </div>
    </section>
  );
}
