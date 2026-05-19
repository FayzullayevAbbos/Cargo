# Dispatcher Cargo List — Frontend Test Task

Modern cargo list page for dispatchers, built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

## Live demo

| Environment | URL |
|-------------|-----|
| **Production** | Set `NEXT_PUBLIC_APP_URL` in Vercel env, or replace the link below after deploy |
| **Local** | [http://localhost:3000/dispatcher/cargo](http://localhost:3000/dispatcher/cargo) |

> **Production URL:** After deploying to Vercel, add your `https://your-project.vercel.app` link here and in the Vercel project settings.

## Tech stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 (App Router) | Framework & routing |
| React 19 | UI |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling & responsive layout |
| Axios | HTTP client with required API headers |
| TanStack React Query | Server state, loading/error handling |
| i18next + react-i18next | uz / en / ru translations |
| lucide-react | Icons |

## Getting started

### Prerequisites

- Node.js 18+
- npm

### 1. Clone & install

```bash
git clone <your-repo-url>
cd dispatcher-cargo
npm install
```

### 2. Environment variables

Copy the example file and set your tokens:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | API base URL (`https://api.sarbon.me/v1`) |
| `NEXT_PUBLIC_CLIENT_TOKEN` | `X-Client-Token` header |
| `NEXT_PUBLIC_USER_TOKEN` | `X-User-Token` header (JWT) |
| `NEXT_PUBLIC_APP_URL` | Optional — production URL for docs/links |

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000/dispatcher/cargo](http://localhost:3000/dispatcher/cargo).

### 4. Production build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add environment variables from `.env.example` in the Vercel dashboard.
4. Deploy — copy your `https://*.vercel.app` URL into the **Live demo** section above.

## Project structure

```
src/
├── app/dispatcher/cargo/page.tsx   # Route: /dispatcher/cargo
├── components/
│   ├── layout/hooks/               # useSidebarCollapsed
│   └── providers/                  # React Query + i18n bootstrap
├── features/cargo/
│   ├── components/                 # UI: filters, table, pagination
│   ├── hooks/                      # useCargoList, useCargoListPage
│   ├── queries/                    # React Query keys (not HTTP)
│   ├── types/                      # Feature types (e.g. filter chips)
│   └── utils/                      # filterCargo, buildFilterChips
├── lib/api/                        # Axios + HTTP endpoints only
│   ├── axiosInstance.ts
│   └── cargo/cargoApi.ts
├── lib/i18n/
└── types/                          # Shared domain types
```

## Features

- **Header** with title and language switcher (uz / en / ru)
- **Filter panel** — cities, transport, weight, dates, offers, favorite, sort
- **Cargo table** — desktop table + mobile cards
- **Pagination** — API pages; total adjusts when client-side filters are active
- **Loading** — skeleton rows
- **Error** — message + retry
- **Empty** — when no cargos match filters

## API

```
GET /dispatchers/cargo/all?page=1&limit=20&sort=created_at:desc&status=SEARCHING_ALL
```

Required headers (set automatically via `axiosInstance`):

- `X-Device-Type: web`
- `X-Language: uz` | `en` | `ru` (follows UI language)
- `X-Client-Token`
- `X-User-Token`
