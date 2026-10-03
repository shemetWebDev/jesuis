import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { ArrowIcon } from "../icons/Icons";

import "./styles.scss";

// Короткий анонс на главной; полный текст — на странице «Обо мне»
export default function Who() {
  const t = useTranslations("who");

  return (
    <section className="section who">
      <div className="container who__inner">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="who__title">{t("title")}</h2>
        <div className="who__body">
          <p className="who__path">{t("path")}</p>
          <Link href="/about" className="link-arrow">
            {t("cta")} <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
