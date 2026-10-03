import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import type { SiteSettings } from "@/src/sanity/types";
import ProjectButton from "../projectButton/ProjectButton";
import ProjectThemes from "./ProjectThemes";

import "./styles.scss";

export default function ProjectTeaser({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("project");

  return (
    <section className="section">
      <div className="container">
        <div className="project-teaser">
          <div className="project-teaser__head">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="project-teaser__title">{t("title")}</h2>
            <p className="project-teaser__subtitle">{t("subtitle")}</p>
            <p className="project-teaser__lead">{t("lead")}</p>
            <blockquote className="project-teaser__quote">{t("quote")}</blockquote>
            <div className="project-teaser__actions">
              <Link href="/project" className="btn btn--light">
                {t("more")}
              </Link>
              <ProjectButton settings={settings} variant="light" />
            </div>
          </div>

          <div className="project-teaser__themes">
            <p className="project-teaser__themes-title">{t("themesTitle")}</p>
            <ProjectThemes />
          </div>
        </div>
      </div>
    </section>
  );
}
