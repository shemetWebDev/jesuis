"use client";

import { useLocale, useTranslations } from "next-intl";
import { useFormSubmit } from "@/src/hooks/useFormSubmit";

import "./styles.scss";

const baseClassName = "lead-form";

export default function LeadForm() {
  const t = useTranslations("lead");
  const locale = useLocale();
  const { status, onSubmit } = useFormSubmit("/api/subscribe");

  return (
    <section className={baseClassName}>
      <div className="container">
      <div className={`${baseClassName}__inner`}>
        <div className={`${baseClassName}__intro`}>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className={`${baseClassName}__title`}>{t("title")}</h2>
          <p className={`${baseClassName}__guide`}>{t("guide")}</p>
        </div>

        <form className={`${baseClassName}__form`} onSubmit={onSubmit}>
          <input type="hidden" name="locale" value={locale} />
          <label className="field">
            <span className="field__label">{t("name")}</span>
            <input className="field__input" name="name" required autoComplete="given-name" />
          </label>
          <label className="field">
            <span className="field__label">{t("email")}</span>
            <input className="field__input" name="email" type="email" required autoComplete="email" />
          </label>
          <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <button className="btn btn--primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? t("sending") : t("submit")}
          </button>

          <p className={`${baseClassName}__note`} role="status">
            {status === "success" ? t("success") : status === "error" ? t("error") : t("consent")}
          </p>
        </form>
      </div>
      </div>
    </section>
  );
}
