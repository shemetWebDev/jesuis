import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="page-head">
      <div className="container-text">
        <span className="eyebrow">404</span>
        <h1 className="page-head__title">{t("title")}</h1>
        <p className="lead page-head__lead">{t("text")}</p>
        <Link href="/" className="btn btn--primary" style={{ marginTop: 40 }}>
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
