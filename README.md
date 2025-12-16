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

## React vs Next.js vs Remix 비교

### React

**특징:**
- UI 라이브러리 (프레임워크가 아님)
- 클라이언트 사이드 렌더링(CSR) 중심
- 유연한 아키텍처, 필요한 기능을 직접 선택

**장점:**
- ✅ 가벼움과 유연성
- ✅ 풍부한 생태계와 커뮤니티
- ✅ 학습 곡선이 낮음
- ✅ 다양한 라이브러리와의 호환성

**단점:**
- ❌ SEO 최적화를 위해 추가 설정 필요
- ❌ 라우팅, 데이터 페칭 등 기능을 직접 구현해야 함
- ❌ 서버 사이드 기능이 없음

---

### Next.js

**특징:**
- React 기반 풀스택 프레임워크
- 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG) 지원
- 파일 기반 라우팅
- Vercel과 긴밀한 통합

**장점:**
- ✅ SEO 최적화 (SSR/SSG)
- ✅ 내장된 라우팅 시스템
- ✅ 이미지 최적화, 폰트 최적화 등 내장 기능
- ✅ API Routes 지원
- ✅ 큰 커뮤니티와 풍부한 문서

**단점:**
- ❌ 빌드 시간이 길어질 수 있음
- ❌ 설정이 복잡할 수 있음
- ❌ 서버 컴포넌트와 클라이언트 컴포넌트 구분 필요 (App Router)
- ❌ Vercel에 종속적일 수 있음

---

### Remix

**특징:**
- React 기반 풀스택 프레임워크
- Web 표준에 기반한 설계 (Form, Link 등)
- 서버와 클라이언트의 경계가 명확
- 파일 기반 라우팅

**장점:**
- ✅ 뛰어난 성능 (최소한의 JavaScript 번들)
- ✅ Web 표준 기반 (Form, Link 등)
- ✅ 강력한 데이터 로딩 (Loader/Action 패턴)
- ✅ 점진적 향상(Progressive Enhancement) 지원
- ✅ 서버와 클라이언트 코드 분리가 명확
- ✅ 빠른 개발 경험 (Vite 통합)
- ✅ SEO 친화적

**단점:**
- ❌ 상대적으로 작은 커뮤니티
- ❌ 학습 곡선이 있음 (Loader/Action 패턴)
- ❌ 플러그인 생태계가 Next.js보다 작음
- ❌ React Router v7로 통합되면서 변경 사항 발생

---

### 언제 무엇을 선택해야 할까?

**React를 선택하는 경우:**
- 단순한 SPA가 필요한 경우
- 완전한 제어가 필요한 경우
- 라이브러리 조합을 직접 선택하고 싶은 경우

**Next.js를 선택하는 경우:**
- SEO가 중요한 마케팅 사이트
- Vercel 배포를 고려하는 경우
- 풍부한 플러그인과 예제가 필요한 경우
- 큰 커뮤니티 지원이 중요한 경우

**Remix를 선택하는 경우:**
- 성능이 최우선인 경우
- Web 표준을 중시하는 경우
- 서버와 클라이언트의 명확한 분리가 필요한 경우
- 점진적 향상을 중시하는 경우
- 빠른 개발 경험을 원하는 경우

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
