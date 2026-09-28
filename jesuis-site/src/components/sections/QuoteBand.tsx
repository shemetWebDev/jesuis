import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import type { SiteSettings } from "@/src/sanity/types";
import ProjectButton from "../projectButton/ProjectButton";

import "./styles.scss";

export default function QuoteBand({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("project");

  return (
    <section className="section">
      <div className="container-text quote-band">
        <span className="eyebrow">
          {t("title")} · {t("subtitle")}
        </span>
        <blockquote className="quote-band__quote">{t("quote")}</blockquote>
        <div className="quote-band__actions">
          <Link href="/project" className="btn btn--outline">
            {t("more")}
          </Link>
          <ProjectButton settings={settings} />
        </div>
      </div>
    </section>
  );
}
