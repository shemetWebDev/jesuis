import { useTranslations } from "next-intl";
import "./styles.scss";

export default function ProjectThemes() {
  const t = useTranslations("project");
  const themes = t.raw("themes") as string[];

  return (
    <ol className="project-themes">
      {themes.map((theme, i) => (
        <li key={theme} className="project-themes__item">
          <span className="project-themes__num">{String(i + 1).padStart(2, "0")}</span>
          {theme}
        </li>
      ))}
    </ol>
  );
}
