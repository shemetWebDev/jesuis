"use client";

import clsx from "clsx";
import { useLocale } from "next-intl";

import { Link, usePathname } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";

import "./styles.scss";

const baseClassName = "language-switcher";

export default function LanguageSwitcher() {
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div className={baseClassName}>
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className={clsx(
            `${baseClassName}__item`,
            locale === current && `${baseClassName}__item--active`,
          )}
          aria-current={locale === current ? "true" : undefined}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
