import { Link, useLocation } from "@remix-run/react";
import type { SupportedLocale } from "~/i18n/utils";
import "../styles/language-switcher.scss";

interface LanguageSwitcherProps {
  currentLocale: SupportedLocale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const location = useLocation();
  
  // 현재 경로에서 locale을 제거하고 새 locale로 교체
  const getAlternatePath = (newLocale: SupportedLocale) => {
    const pathWithoutLocale = location.pathname.replace(/^\/(ko|en)/, "");
    return `/${newLocale}${pathWithoutLocale || ""}`;
  };

  return (
    <div className="language-switcher">
      <Link
        to={getAlternatePath("ko")}
        className={`lang-btn ${currentLocale === "ko" ? "active" : ""}`}
      >
        한국어
      </Link>
      <Link
        to={getAlternatePath("en")}
        className={`lang-btn ${currentLocale === "en" ? "active" : ""}`}
      >
        English
      </Link>
    </div>
  );
}

