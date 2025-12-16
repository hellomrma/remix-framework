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

export default function About() {
  const { locale } = useLoaderData<typeof loader>();
  const params = useParams();
  const currentLocale = (params.locale as SupportedLocale) || locale;

  return (
    <div className="page-container">
      <nav className="main-nav">
        <Link to={`/${currentLocale}`} className="nav-link">
          {t(currentLocale, "nav.home")}
        </Link>
        <Link to={`/${currentLocale}/about`} className="nav-link active">
          {t(currentLocale, "nav.about")}
        </Link>
        <Link to={`/${currentLocale}/contact`} className="nav-link">
          {t(currentLocale, "nav.contact")}
        </Link>
      </nav>

      <div className="page-content">
        <div className="content-card">
          <h1>{t(currentLocale, "about.title")}</h1>
          <p className="subtitle">{t(currentLocale, "about.subtitle")}</p>
          <p className="description">{t(currentLocale, "about.description")}</p>

          <div className="features-section">
            <h2>{t(currentLocale, "about.features.title")}</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>{t(currentLocale, "about.features.item1.title")}</h3>
                <p>{t(currentLocale, "about.features.item1.description")}</p>
              </div>
              <div className="feature-card">
                <h3>{t(currentLocale, "about.features.item2.title")}</h3>
                <p>{t(currentLocale, "about.features.item2.description")}</p>
              </div>
              <div className="feature-card">
                <h3>{t(currentLocale, "about.features.item3.title")}</h3>
                <p>{t(currentLocale, "about.features.item3.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

