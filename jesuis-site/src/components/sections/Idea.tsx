import { useTranslations } from "next-intl";
import "./styles.scss";

export default function Idea() {
  const t = useTranslations("idea");
  const not = t.raw("not") as string[];
  const questions = t.raw("questions") as string[];

  return (
    <section className="idea">
      <div className="container idea__inner">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="idea__title">{t("title")}</h2>

        <div className="idea__columns">
          <ul className="idea__not">
            {not.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <div className="idea__but">
            <p className="idea__but-label">{t("but")}</p>
            <ul className="idea__questions">
              {questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="idea__outro">{t("outro")}</p>
      </div>
    </section>
  );
}
