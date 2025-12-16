import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { detectLocaleFromHeader } from "~/i18n/utils";

// 루트 경로에서 언어 감지 후 리다이렉트
export async function loader({ request }: LoaderFunctionArgs) {
  const locale = detectLocaleFromHeader(request);
  return redirect(`/${locale}`);
}
