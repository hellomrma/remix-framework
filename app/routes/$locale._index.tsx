import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getLocale, t, type SupportedLocale, supportedLocales } from "~/i18n/utils";
import { Link, useParams } from "@remix-run/react";
import "../styles/main.scss";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const localeParam = params.locale as SupportedLocale;
  const locale = (localeParam && supportedLocales.includes(localeParam)) 
    ? localeParam 
    : (await getLocale(request));
  return { locale };
}

export default function Index() {
  const { locale } = useLoaderData<typeof loader>();
  const params = useParams();
  const currentLocale = (params.locale as SupportedLocale) || locale;

  return (
    <div className="page-container">
      <nav className="main-nav">
        <Link to={`/${currentLocale}`} className="nav-link active">
          {t(currentLocale, "nav.home")}
        </Link>
        <Link to={`/${currentLocale}/about`} className="nav-link">
          {t(currentLocale, "nav.about")}
        </Link>
        <Link to={`/${currentLocale}/contact`} className="nav-link">
          {t(currentLocale, "nav.contact")}
        </Link>
      </nav>

      <div className="home-container">
        <div className="content-card">
          <h1>{t(currentLocale, "welcome")}</h1>
          <p>{t(currentLocale, "description")}</p>
          <div className="info-section">
            <div className="info-card blue">
              <h2>{t(currentLocale, "gettingStarted.title")}</h2>
              <p>
                <code>{t(currentLocale, "gettingStarted.code")}</code>{" "}
                {t(currentLocale, "gettingStarted.description")}
              </p>
            </div>
            <div className="info-card green">
              <h2>{t(currentLocale, "devServer.title")}</h2>
              <p>
                <code>{t(currentLocale, "devServer.code")}</code>{" "}
                {t(currentLocale, "devServer.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

