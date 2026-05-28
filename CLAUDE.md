# 📎 마이링크(MyLink) 기능 정의서 (PRD)

> **버전** v2.0 | **작성일** 2026-05-28 | **상태** 바이브코딩용 작업 문서

---

## ⚡ 바이브코딩 환경 정보

| 항목 | 내용 |
|------|------|
| AI 코딩 도구 | **Claude Code** (claude.ai/code) |
| 프레임워크 | **Next.js 14+ (App Router)** |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| 백엔드/DB | **미정** → 아래 권장 스택 참고 |
| 배포 | **Vercel** |
| 개발 범위 | MVP 필수 기능 + 선택 기능 일부 |

### 🔧 Claude Code 권장 백엔드 스택 (미정이므로 참고용)

바이브코딩 특성상 **Supabase** 추천 — Claude Code와 궁합이 좋고, Next.js + Vercel 배포와 원클릭 연동됨.

```
Next.js (App Router)
  ├── Supabase (Auth + PostgreSQL DB + Storage)
  ├── Tailwind CSS + shadcn/ui
  └── Vercel 배포
```

> 백엔드 확정 전까지 Claude Code에게 "Supabase 기반으로 설계해줘" 라고 프롬프트하면 됨.

---

## 1. 프로젝트 개요

### 1.1 프로젝트명

**마이링크 (MyLink)**
> 링크트리(Linktree) 클론 서비스 — 나만의 링크 모음 페이지를 5분 안에 만드는 서비스

### 1.2 목적

개인 크리에이터, 프리랜서, 소상공인이 SNS 바이오 란에 넣을 수 있는 **단일 링크 페이지**를 쉽게 만들 수 있도록 한다. 여러 플랫폼에 흩어진 링크를 하나의 URL로 통합하여 방문자에게 최적의 접근성을 제공한다.

### 1.3 대상 사용자

| 유형 | 설명 |
|------|------|
| 개인 크리에이터 | 개발자, 유튜버 등 |
| 프리랜서 / 1인 사업자 | 포트폴리오·연락처·결제 링크를 한 곳에 모으고 싶은 사람 |
| 소상공인 | 배달앱, 네이버 플레이스, SNS 계정을 연결하고 싶은 가게 |
| 일반 사용자 | 자기소개 페이지가 필요한 누구나 |

---

## 2. 폴더 구조 (Claude Code 참고용)

> Claude Code 시작 시 아래 구조를 프롬프트에 붙여넣어 방향을 잡아줄 것.

```
mylink/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx       ← 링크 관리 메인
│   │   ├── appearance/page.tsx      ← 테마/스타일 설정
│   │   ├── analytics/page.tsx       ← 방문자 통계
│   │   └── settings/page.tsx        ← 프로필 설정
│   ├── @[username]/
│   │   └── page.tsx                 ← 퍼블릭 링크 페이지
│   ├── layout.tsx
│   └── page.tsx                     ← 랜딩 페이지
├── components/
│   ├── dashboard/
│   │   ├── LinkCard.tsx             ← 링크 카드 (드래그 가능)
│   │   ├── LinkEditor.tsx           ← 링크 추가/수정 모달
│   │   └── LinkList.tsx             ← 드래그앤드롭 리스트
│   ├── public/
│   │   ├── ProfileHeader.tsx        ← 퍼블릭 페이지 프로필
│   │   └── LinkButton.tsx           ← 퍼블릭 링크 버튼
│   └── ui/                          ← shadcn/ui 컴포넌트
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
└── types/
    └── index.ts                     ← 공통 타입 정의
```

---

## 3. 데이터 모델 (DB 스키마 초안)

> Claude Code에게 "아래 스키마 기반으로 Supabase 테이블 생성 SQL 작성해줘" 라고 프롬프트하면 됨.

```sql
-- 사용자 프로필
profiles (
  id          uuid PRIMARY KEY,   -- Supabase auth.users.id 참조
  username    text UNIQUE,        -- @username (슬러그)
  display_name text,
  bio         text,
  avatar_url  text,
  is_public   boolean DEFAULT true,
  theme       jsonb,              -- 테마 설정 JSON
  created_at  timestamptz
)

-- 링크
links (
  id          uuid PRIMARY KEY,
  profile_id  uuid REFERENCES profiles(id),
  title       text,
  url         text,
  icon_url    text,
  is_active   boolean DEFAULT true,
  sort_order  integer,
  scheduled_at timestamptz,      -- F-10 예약 공개용
  expires_at  timestamptz,       -- F-10 예약 종료용
  created_at  timestamptz
)

-- 방문자 클릭 이벤트
click_events (
  id          uuid PRIMARY KEY,
  profile_id  uuid REFERENCES profiles(id),
  link_id     uuid REFERENCES links(id) NULL,  -- NULL이면 페이지 조회
  referrer    text,
  user_agent  text,
  created_at  timestamptz
)
```

---

## 4. 핵심 기능 목록

> 🟢 **Phase 1 (MVP)** — 먼저 완성할 것
> 🔵 **Phase 2 (선택)** — MVP 완성 후 추가

| # | 기능명 | 단계 | Claude Code 난이도 |
|---|--------|------|--------------------|
| F-01 | 회원가입 / 로그인 | 🟢 Phase 1 | ⭐⭐ |
| F-02 | 링크 페이지 생성 및 관리 | 🟢 Phase 1 | ⭐⭐ |
| F-03 | 링크 추가 / 수정 / 삭제 | 🟢 Phase 1 | ⭐⭐ |
| F-04 | 링크 순서 변경 (드래그 앤 드롭) | 🟢 Phase 1 | ⭐⭐⭐ |
| F-05 | 프로필 설정 (사진, 이름, 소개) | 🟢 Phase 1 | ⭐⭐ |
| F-06 | 테마 / 스타일 선택 | 🟢 Phase 1 | ⭐⭐⭐ |
| F-07 | 퍼블릭 페이지 공개 URL | 🟢 Phase 1 | ⭐⭐ |
| F-08 | 방문자 통계 (클릭 수 집계) | 🟢 Phase 1 | ⭐⭐⭐ |
| F-09 | SNS 아이콘 링크 | 🔵 Phase 2 | ⭐⭐ |
| F-10 | 링크 예약 공개 / 비공개 | 🔵 Phase 2 | ⭐⭐⭐ |
| F-15 | QR 코드 생성 | 🔵 Phase 2 | ⭐⭐ |

---

## 5. 기능 상세 설명

---

### 🟢 F-01. 회원가입 / 로그인

**목적:** 사용자 계정 생성 및 인증

**상세 내용:**
- 이메일 + 비밀번호 회원가입
- 소셜 로그인: Google, Kakao
- 이메일 인증을 통한 계정 활성화
- 비밀번호 재설정 (이메일 링크 발송)
- JWT 기반 세션 관리

**예외 처리:**
- 중복 이메일 가입 방지
- 비밀번호 최소 8자, 영문+숫자 조합 필수
- 5회 로그인 실패 시 계정 일시 잠금 (15분)

**Claude Code 프롬프트 예시:**
```
Supabase Auth를 사용해서 이메일/비밀번호 로그인과
Google 소셜 로그인 기능을 Next.js App Router에 구현해줘.
미들웨어로 인증 상태 체크도 추가해줘.
```

---

### 🟢 F-02. 링크 페이지 생성 및 관리

**목적:** 사용자별 공개 링크 페이지 생성 및 관리

**상세 내용:**
- 회원가입 완료 시 기본 페이지 자동 생성
- 퍼블릭 URL 형식: `mylink.kr/@{username}`
- 사용자 ID(슬러그): 영문 소문자, 숫자, 언더스코어(`_`) 허용
- 페이지 공개 / 비공개 전환 토글
- 1계정 1페이지 (MVP 기준)

**제약 조건:**
- 사용자 ID 3~30자, 30일에 1회 변경 가능
- 예약어 사용 불가 (`admin`, `login`, `api`, `dashboard` 등)

**Next.js 라우팅:**
```
app/@[username]/page.tsx   ← 퍼블릭 페이지 (동적 라우트)
```

**Claude Code 프롬프트 예시:**
```
app/@[username]/page.tsx를 만들어줘.
Supabase에서 username으로 profiles와 links를 조회해서
퍼블릭 링크 페이지를 SSR로 렌더링해줘.
존재하지 않는 username은 404 처리해줘.
```

---

### 🟢 F-03. 링크 추가 / 수정 / 삭제

**목적:** 방문자에게 보여줄 링크 관리

**상세 내용:**
- 링크 입력 필드: 제목(Title), URL, 아이콘(선택)
- 링크 활성화 / 비활성화 토글
- 링크 최대 30개 (무료 플랜)
- URL 유효성 검사 (http/https)
- 외부 링크는 새 탭(`target="_blank"`)으로 오픈

**UI 흐름:**
1. 대시보드 → '링크 추가' 버튼
2. 제목 / URL 입력 Sheet(사이드패널) or 모달
3. 저장 시 실시간 미리보기 반영

**Claude Code 프롬프트 예시:**
```
링크 추가/수정 기능을 만들어줘.
shadcn/ui의 Sheet 컴포넌트로 우측 슬라이드 패널을 열고,
제목과 URL 입력 후 Supabase links 테이블에 저장해줘.
저장 완료 시 대시보드 링크 목록을 낙관적 업데이트(optimistic update)로 즉시 반영해줘.
```

---

### 🟢 F-04. 링크 순서 변경 (드래그 앤 드롭)

**목적:** 링크 노출 순서를 직관적으로 조절

**상세 내용:**
- 드래그 앤 드롭으로 링크 카드 순서 재배치
- 모바일 롱프레스 후 드래그 지원
- 변경된 순서 자동 저장 (별도 저장 버튼 불필요)
- Supabase `sort_order` 컬럼 일괄 업데이트

**권장 라이브러리:** `@dnd-kit/core`, `@dnd-kit/sortable`

**Claude Code 프롬프트 예시:**
```
@dnd-kit/sortable을 사용해서 링크 카드 드래그앤드롭을 구현해줘.
순서 변경 완료 시 변경된 sort_order를 Supabase에 일괄 업데이트하는
Server Action도 함께 만들어줘.
```

---

### 🟢 F-05. 프로필 설정

**목적:** 방문자가 페이지 주인을 인식할 수 있도록 프로필 표시

**상세 내용:**
- 프로필 사진 업로드 (JPG, PNG, GIF, 최대 5MB)
  - Supabase Storage `avatars` 버킷에 저장
  - 업로드 후 자동 크롭 (1:1 비율)
- 표시 이름 최대 50자
- 한 줄 소개(Bio) 최대 150자
- 변경사항 실시간 미리보기

**Claude Code 프롬프트 예시:**
```
프로필 설정 페이지를 만들어줘.
이미지 업로드는 Supabase Storage를 사용하고,
react-image-crop으로 1:1 크롭 기능을 추가해줘.
저장은 Next.js Server Action으로 처리해줘.
```

---

### 🟢 F-06. 테마 / 스타일 선택

**목적:** 개성 있는 페이지 디자인으로 브랜딩 강화

**상세 내용:**
- 기본 테마 10종 (라이트, 다크, 파스텔, 그라디언트 등)
- 배경 색상 직접 지정 (컬러 피커)
- 링크 버튼 스타일: 둥근 / 직각 / 쉐도우
- 폰트 3종 (한글 지원 포함)
- 테마 설정은 `profiles.theme` JSON으로 저장
- 우측 패널에서 실시간 미리보기

**테마 JSON 구조 예시:**
```json
{
  "bg": "#f0f4ff",
  "buttonStyle": "rounded",
  "buttonColor": "#4f46e5",
  "buttonTextColor": "#ffffff",
  "font": "Noto Sans KR"
}
```

**Claude Code 프롬프트 예시:**
```
테마 설정 페이지를 만들어줘.
좌측에 설정 패널, 우측에 실시간 퍼블릭 페이지 미리보기가 있는
2컬럼 레이아웃으로 구성해줘.
설정값은 profiles.theme JSON으로 Supabase에 저장해줘.
```

---

### 🟢 F-07. 퍼블릭 페이지 공개 URL

**목적:** 고유 URL로 링크 페이지 공개

**상세 내용:**
- URL: `https://mylink.kr/@{username}`
- 로그인 없이 방문 가능
- Next.js SSR로 OG 태그 자동 생성 (SNS 공유 미리보기)
- 모바일 반응형 필수
- LCP 2초 이내 목표

**Next.js 메타데이터 예시:**
```typescript
// app/@[username]/page.tsx
export async function generateMetadata({ params }) {
  const profile = await getProfile(params.username);
  return {
    title: `${profile.display_name} | 마이링크`,
    openGraph: {
      images: [profile.avatar_url],
      description: profile.bio,
    },
  };
}
```

---

### 🟢 F-08. 방문자 통계

**목적:** 페이지 성과 확인

**상세 내용:**
- 총 페이지 조회 수
- 링크별 클릭 수 및 클릭률(CTR)
- 최근 7일 / 30일 날짜별 추이 차트
- 클릭 이벤트는 `click_events` 테이블에 기록
- Vercel Edge Function or Next.js Route Handler로 비동기 수집

**권장 차트 라이브러리:** `recharts` (Next.js와 궁합 좋음)

**Claude Code 프롬프트 예시:**
```
방문자 통계 페이지를 만들어줘.
click_events 테이블에서 최근 30일 데이터를 집계해서
recharts로 날짜별 조회수 라인 차트와
링크별 클릭 수 바 차트를 그려줘.
```

---

### 🔵 F-09. SNS 아이콘 링크

**목적:** 자주 사용하는 SNS를 아이콘으로 빠르게 연결

**상세 내용:**
- 지원: Instagram, YouTube, TikTok, X, Facebook, 카카오톡, 네이버 블로그, GitHub
- 프로필 하단에 아이콘 뱃지 노출
- 일반 링크 목록과 별도 표시

**권장 라이브러리:** `react-icons` (`si` 시리즈 활용)

---

### 🔵 F-10. 링크 예약 공개 / 비공개

**목적:** 특정 날짜에 링크를 자동 공개/숨김

**상세 내용:**
- 링크별 공개 시작일 / 종료일 설정
- `links.scheduled_at`, `links.expires_at` 컬럼 활용
- 퍼블릭 페이지 렌더링 시 현재 시간과 비교하여 필터링

---

### 🔵 F-15. QR 코드 생성

**목적:** 오프라인에서 링크 페이지 공유

**상세 내용:**
- 내 링크 페이지 URL → QR 코드 즉시 생성
- PNG / SVG 다운로드
- 무료 플랜 포함 제공

**권장 라이브러리:** `qrcode.react`

**Claude Code 프롬프트 예시:**
```
qrcode.react로 내 링크 페이지 URL의 QR 코드를 생성하고
PNG로 다운로드하는 버튼을 대시보드 설정 페이지에 추가해줘.
```

---

## 6. Claude Code 개발 순서 (추천 플로우)

바이브코딩 시 아래 순서로 진행하면 막힘 없이 개발 가능함.

```
1단계: 프로젝트 셋업
  └── Next.js 14 + TypeScript + Tailwind + shadcn/ui 초기화
  └── Supabase 프로젝트 생성 + 환경변수 설정
  └── DB 스키마 생성 (profiles, links, click_events)

2단계: 인증 (F-01)
  └── Supabase Auth 연동
  └── 로그인 / 회원가입 페이지
  └── 미들웨어 인증 가드

3단계: 퍼블릭 페이지 (F-07)
  └── app/@[username]/page.tsx SSR 구현
  └── 기본 레이아웃 + 링크 버튼 컴포넌트

4단계: 대시보드 - 링크 관리 (F-02, F-03, F-04)
  └── 링크 CRUD
  └── 드래그앤드롭 순서 변경

5단계: 프로필 + 테마 (F-05, F-06)
  └── 프로필 사진 업로드
  └── 테마 설정 + 실시간 미리보기

6단계: 통계 (F-08)
  └── 클릭 이벤트 수집 API
  └── 통계 대시보드 UI

7단계: Phase 2 기능 (F-09, F-10, F-15)
  └── SNS 아이콘, 예약 공개, QR 코드
```

---

## 7. 환경변수 목록 (`.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# 앱 URL
NEXT_PUBLIC_APP_URL=https://mylink.kr
```

---

## 8. Vercel 배포 체크리스트

- [ ] Vercel 프로젝트 생성 및 GitHub 연동
- [ ] 환경변수 Vercel 대시보드에 등록
- [ ] Supabase → Authentication → URL Configuration에 Vercel URL 추가
- [ ] `mylink.kr` 도메인 연결 (Vercel Domains 설정)
- [ ] Vercel Analytics 활성화 (선택)

---

## 9. 비기능 요구사항

| 항목 | 목표 |
|------|------|
| 성능 | 퍼블릭 페이지 LCP 2초 이내 (Next.js SSR 활용) |
| 가용성 | Vercel 기본 SLA 99.99% |
| 보안 | HTTPS 전용, Supabase RLS(Row Level Security) 필수 적용 |
| 모바일 | iOS 15+ / Android 10+ 브라우저 지원 |

> ⚠️ **Supabase RLS 필수** — 모든 테이블에 RLS 정책 설정 안 하면 보안 구멍 생김.
> Claude Code에게 "RLS 정책도 같이 작성해줘" 라고 항상 요청할 것.

## 기존 작업 현황
- 테마/디자인 이미 완성됨
- 기존 스타일 건드리지 말고 기능 구현에만 집중할 것

---

*본 문서는 Claude Code 바이브코딩 작업 기준 문서입니다. 개발 진행에 따라 업데이트 예정.*
