import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getLocale, getLocaleFromUrl, supportedLocales, type SupportedLocale } from "./i18n/utils";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

import "./styles/main.scss";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await getLocale(request);
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  return { locale, baseUrl };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>();
  const location = useLocation();
  
  // loader 데이터가 없을 경우 기본값 사용
  const locale = loaderData?.locale || "ko";
  const baseUrl = loaderData?.baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  
  // 현재 경로에서 locale 추출
  const currentLocale = getLocaleFromUrl(location.pathname) || locale;
  
  // hreflang 태그 생성
  const getAlternateUrl = (altLocale: SupportedLocale) => {
    const pathWithoutLocale = location.pathname.replace(/^\/(ko|en)/, "");
    return baseUrl ? `${baseUrl}/${altLocale}${pathWithoutLocale || ""}` : `/${altLocale}${pathWithoutLocale || ""}`;
  };
  
  return (
    <html lang={currentLocale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* hreflang 태그 추가 - SEO 최적화 */}
        {supportedLocales.map((altLocale) => (
          <link
            key={altLocale}
            rel="alternate"
            hrefLang={altLocale}
            href={getAlternateUrl(altLocale)}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={getAlternateUrl("ko")} />
        <Meta />
        <Links />
      </head>
      <body>
        <LanguageSwitcher currentLocale={currentLocale} />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

