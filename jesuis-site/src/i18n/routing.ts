import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en", "fr"],
  defaultLocale: "ru",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
