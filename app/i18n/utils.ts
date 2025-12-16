import type { Cookie } from "@remix-run/node";
import { createCookie } from "@remix-run/node";
import koTranslations from "./translations/ko.json";
import enTranslations from "./translations/en.json";

export type SupportedLocale = "ko" | "en";

export const translations = {
  ko: koTranslations,
  en: enTranslations,
} as const;

export const defaultLocale: SupportedLocale = "ko";
export const supportedLocales: SupportedLocale[] = ["ko", "en"];

// 언어 쿠키 생성 (서버에서만 사용)
export function getLocaleCookie() {
  // Vite에서는 import.meta.env를 사용하지만, 서버 사이드에서는 process.env를 사용
  const isProduction = typeof process !== "undefined" 
    ? process.env.NODE_ENV === "production"
    : false;
  
  return createCookie("locale", {
    maxAge: 60 * 60 * 24 * 365, // 1년
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
  });
}

// URL 또는 경로에서 언어 추출
export function getLocaleFromUrl(urlOrPath: string): SupportedLocale | null {
  let pathname: string;
  
  // 전체 URL인지 경로만인지 확인
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
    const urlObj = new URL(urlOrPath);
    pathname = urlObj.pathname;
  } else {
    // 경로만 전달된 경우
    pathname = urlOrPath;
  }
  
  const localeMatch = pathname.match(/^\/(ko|en)(\/|$)/);
  return localeMatch ? (localeMatch[1] as SupportedLocale) : null;
}

// 쿠키에서 언어 가져오기 (fallback)
export async function getLocaleFromCookie(request: Request): Promise<SupportedLocale> {
  const cookieHeader = request.headers.get("Cookie");
  const localeCookie = getLocaleCookie();
  const locale = await localeCookie.parse(cookieHeader);
  return (locale || defaultLocale) as SupportedLocale;
}

// URL 또는 쿠키에서 언어 가져오기
export async function getLocale(request: Request): Promise<SupportedLocale> {
  const urlLocale = getLocaleFromUrl(request.url);
  if (urlLocale) {
    return urlLocale;
  }
  return await getLocaleFromCookie(request);
}

// Accept-Language 헤더에서 언어 감지
export function detectLocaleFromHeader(request: Request): SupportedLocale {
  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage) {
    if (acceptLanguage.includes("ko")) {
      return "ko";
    }
    if (acceptLanguage.includes("en")) {
      return "en";
    }
  }
  return defaultLocale;
}

// 언어별 번역 가져오기
export function getTranslations(locale: SupportedLocale) {
  return translations[locale];
}

// 번역 함수 (중첩된 키 지원)
export function t(
  locale: SupportedLocale,
  key: string
): string {
  const keys = key.split(".");
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // 키를 찾을 수 없으면 키 자체를 반환
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}

