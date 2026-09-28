"use client";

import { useTranslations } from "next-intl";
import { useFormSubmit } from "@/src/hooks/useFormSubmit";

import "./styles.scss";

const baseClassName = "contact-form";

export default function ContactForm() {
  const t = useTranslations("contacts");
  const { status, onSubmit } = useFormSubmit("/api/contact");

  return (
    <form className={baseClassName} onSubmit={onSubmit}>
      <h2 className={`${baseClassName}__title`}>{t("formTitle")}</h2>
      <div className={`${baseClassName}__row`}>
        <label className="field">
          <span className="field__label">{t("name")}</span>
          <input className="field__input" name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span className="field__label">{t("email")}</span>
          <input className="field__input" name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span className="field__label">{t("message")}</span>
        <textarea className="field__input" name="message" required rows={6} />
      </label>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className={`${baseClassName}__actions`}>
        <button className="btn btn--primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? t("sending") : t("send")}
        </button>
        <p className={`${baseClassName}__status`} role="status">
          {status === "success" && t("success")}
          {status === "error" && t("error")}
        </p>
      </div>
    </form>
  );
}
