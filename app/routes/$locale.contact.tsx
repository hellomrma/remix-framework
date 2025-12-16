import { useLoaderData, Form } from "@remix-run/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { getLocale, t, type SupportedLocale, supportedLocales } from "~/i18n/utils";
import { Link, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import "../styles/main.scss";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const localeParam = params.locale as SupportedLocale;
  const locale = (localeParam && supportedLocales.includes(localeParam)) 
    ? localeParam 
    : (await getLocale(request));
  return { locale };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // 실제로는 여기서 이메일 전송 등의 로직을 구현합니다
  console.log("Contact form submission:", { name, email, message });

  return json({ success: true, message: "Thank you for your message!" });
}

export default function Contact() {
  const { locale } = useLoaderData<typeof loader>();
  const params = useParams();
  const currentLocale = (params.locale as SupportedLocale) || locale;

  return (
    <div className="page-container">
      <nav className="main-nav">
        <Link to={`/${currentLocale}`} className="nav-link">
          {t(currentLocale, "nav.home")}
        </Link>
        <Link to={`/${currentLocale}/about`} className="nav-link">
          {t(currentLocale, "nav.about")}
        </Link>
        <Link to={`/${currentLocale}/contact`} className="nav-link active">
          {t(currentLocale, "nav.contact")}
        </Link>
      </nav>

      <div className="page-content">
        <div className="content-card">
          <h1>{t(currentLocale, "contact.title")}</h1>
          <p className="subtitle">{t(currentLocale, "contact.subtitle")}</p>

          <div className="contact-wrapper">
            <div className="contact-form-section">
              <h2>{t(currentLocale, "contact.form.name")}</h2>
              <Form method="post" className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">{t(currentLocale, "contact.form.name")}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t(currentLocale, "contact.form.namePlaceholder")}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t(currentLocale, "contact.form.email")}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t(currentLocale, "contact.form.emailPlaceholder")}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t(currentLocale, "contact.form.message")}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t(currentLocale, "contact.form.messagePlaceholder")}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  {t(currentLocale, "contact.form.submit")}
                </button>
              </Form>
            </div>

            <div className="contact-info-section">
              <h2>{t(currentLocale, "contact.info.title")}</h2>
              <div className="info-item">
                <strong>{t(currentLocale, "contact.info.email")}:</strong>
                <span>contact@example.com</span>
              </div>
              <div className="info-item">
                <strong>{t(currentLocale, "contact.info.phone")}:</strong>
                <span>+82-10-1234-5678</span>
              </div>
              <div className="info-item">
                <strong>{t(currentLocale, "contact.info.address")}:</strong>
                <span>서울특별시 강남구 테헤란로 123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

