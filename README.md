# remix-framework

Remix Framework로 만든 간단한 웹사이트 프로젝트입니다.

## 시작하기

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 시작되면 브라우저에서 [http://localhost:5173](http://localhost:5173)을 열어 확인할 수 있습니다.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
remix-framework/
├── app/
│   ├── routes/              # 라우트 파일들
│   │   ├── _index.tsx       # 루트 리다이렉트 (언어 감지)
│   │   ├── $locale._index.tsx # 홈 페이지 (/ko, /en)
│   │   ├── $locale.about.tsx  # About 페이지 (/ko/about, /en/about)
│   │   └── $locale.contact.tsx # Contact 페이지 (/ko/contact, /en/contact)
│   ├── i18n/                # 다국어 관련 파일들
│   │   ├── translations/    # 번역 파일들
│   │   │   ├── ko.json      # 한국어 번역
│   │   │   └── en.json      # 영어 번역
│   │   └── utils.ts         # 다국어 유틸리티
│   ├── components/          # 컴포넌트
│   │   └── LanguageSwitcher.tsx # 언어 전환 컴포넌트
│   ├── styles/              # SCSS 스타일 파일들
│   │   ├── main.scss        # 메인 스타일시트
│   │   └── language-switcher.scss # 언어 전환 스타일
│   └── root.tsx             # 루트 레이아웃 (hreflang 태그 포함)
├── public/                  # 정적 파일들
├── vite.config.ts           # Vite 설정
└── tsconfig.json            # TypeScript 설정
```

## 기술 스택

- **Remix** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 빌드 도구
- **SCSS** - CSS 전처리기
- **다국어 지원** - 한국어/영어 전환 기능

## 새로운 페이지 추가하기

`app/routes/` 디렉토리에 `$locale`을 포함한 파일을 추가하면 자동으로 다국어 라우트가 생성됩니다.

예: `app/routes/$locale.products.tsx` 파일을 만들면 `/ko/products`와 `/en/products` 경로가 생성됩니다.

## 다국어 사용하기

### URI 기반 다국어 라우팅 (SEO 최적화)

이 프로젝트는 SEO 최적화를 위해 URI에 언어 코드를 포함하는 방식을 사용합니다:

- 한국어: `/ko`, `/ko/about`, `/ko/contact`
- 영어: `/en`, `/en/about`, `/en/contact`

루트 경로(`/`)로 접근하면 브라우저의 `Accept-Language` 헤더를 기반으로 자동으로 적절한 언어로 리다이렉트됩니다.

### SEO 최적화 기능

- **hreflang 태그**: 각 페이지에 언어별 대체 링크를 제공하여 검색 엔진이 언어별 콘텐츠를 명확히 구분할 수 있습니다
- **URI 분리**: 각 언어별로 별도의 URL을 가지므로 검색 엔진이 각 언어 버전을 독립적으로 인덱싱합니다
- **언어별 메타 태그**: HTML lang 속성이 올바르게 설정되어 있습니다

### 번역 파일 추가

`app/i18n/translations/` 디렉토리에 있는 `ko.json`과 `en.json` 파일에 번역을 추가하세요.

```json
{
  "myKey": "내용",
  "nested": {
    "key": "중첩된 키"
  }
}
```

### 컴포넌트에서 사용하기

```tsx
import { useLoaderData, useParams } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getLocale, t, type SupportedLocale } from "~/i18n/utils";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const locale = (params.locale as SupportedLocale) || (await getLocale(request));
  return { locale };
}

export default function MyComponent() {
  const { locale } = useLoaderData<typeof loader>();
  const params = useParams();
  const currentLocale = (params.locale as SupportedLocale) || locale;
  
  return (
    <div>
      <h1>{t(currentLocale, "myKey")}</h1>
      <p>{t(currentLocale, "nested.key")}</p>
    </div>
  );
}
```

### 라우트 파일 구조

URI 기반 다국어를 사용하려면 라우트 파일명에 `$locale`을 포함해야 합니다:

- `app/routes/$locale._index.tsx` - 홈 페이지 (`/ko`, `/en`)
- `app/routes/$locale.about.tsx` - About 페이지 (`/ko/about`, `/en/about`)
- `app/routes/$locale.contact.tsx` - Contact 페이지 (`/ko/contact`, `/en/contact`)

### 언어 전환

우측 상단의 언어 전환 버튼을 클릭하면 현재 페이지의 언어만 변경되며, 같은 페이지의 다른 언어 버전으로 이동합니다.
