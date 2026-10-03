import { useTranslations } from "next-intl";
import type { SiteSettings } from "@/src/sanity/types";

// Кнопка главного проекта: «Скоро» или «Присоединиться» — переключается в админке
export default function ProjectButton({
  settings,
  variant = "primary",
}: {
  settings: SiteSettings;
  variant?: "primary" | "light";
}) {
  const t = useTranslations("project");
  const isOpen = settings.mainProjectStatus === "open" && settings.mainProjectUrl;

  if (!isOpen) {
    return (
      <span className={`btn btn--${variant === "light" ? "light" : "outline"}`} aria-disabled="true">
        {t("soon")}
      </span>
    );
  }

  return (
    <a
      href={settings.mainProjectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn--${variant === "light" ? "gold" : "primary"}`}
    >
      {t("join")}
    </a>
  );
}
