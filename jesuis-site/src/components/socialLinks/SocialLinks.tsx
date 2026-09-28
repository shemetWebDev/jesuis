import clsx from "clsx";

import type { SiteSettings } from "@/src/sanity/types";
import { InstagramIcon, MailIcon, TelegramIcon, YoutubeIcon } from "../icons/Icons";

import "./styles.scss";

const baseClassName = "social-links";

type Props = {
  settings: SiteSettings;
  tone?: "light" | "dark";
  withLabels?: boolean;
};

export default function SocialLinks({ settings, tone = "light", withLabels = false }: Props) {
  const links = [
    { key: "telegram", label: "Telegram", href: settings.telegramUrl, Icon: TelegramIcon },
    { key: "instagram", label: "Instagram", href: settings.instagramUrl, Icon: InstagramIcon },
    { key: "youtube", label: "YouTube", href: settings.youtubeUrl, Icon: YoutubeIcon },
    {
      key: "email",
      label: settings.email ?? "Email",
      href: settings.email ? `mailto:${settings.email}` : undefined,
      Icon: MailIcon,
    },
  ].filter((link) => link.href);

  if (!links.length) return null;

  return (
    <ul
      className={clsx(
        baseClassName,
        `${baseClassName}--${tone}`,
        withLabels && `${baseClassName}--labels`,
      )}
    >
      {links.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            className={`${baseClassName}__link`}
            aria-label={withLabels ? undefined : label}
            {...(key !== "email" && { target: "_blank", rel: "noopener noreferrer" })}
          >
            <Icon />
            {withLabels && <span>{label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
