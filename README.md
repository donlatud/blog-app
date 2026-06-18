# Blog App (Frontend)

Next.js frontend for the Blog System — consumes the REST API from [`blog-app-server`](../blog-app-server) (Express + Supabase).

## Prerequisites

- Node.js 20+
- Running backend (`blog-app-server`) on port 4000
- Supabase project with schema + seed data (see backend README)

## Local development

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Variable | Description | Local default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (no trailing slash) | `http://localhost:4000` |

## Features

| Route | Description |
|---|---|
| `/` | Blog list, search, pagination (10 per page) |
| `/blog/[slug]` | Article detail, gallery, approved comments |
| `/login`, `/register` | Member auth |
| `/admin/login` | Admin-only sign in |
| `/admin` | Dashboard — article list + CRUD |
| `/admin/comments` | Comment moderation (approve / reject) |

## Project structure

```
src/
├─ app/                      # App Router pages
├─ components/
│  ├─ admin/                 # Admin panel UI
│  ├─ auth/                  # Login / register forms
│  ├─ blog/                  # Blog cards, detail, comments
│  ├─ landing/               # Home page
│  └─ layout/                # Header, footer, PageError
├─ constants/config.ts       # API URL, BLOG_PAGE_SIZE (= 10)
├─ context/AuthProvider.tsx  # Session state
├─ lib/api/                  # API clients (server + client)
└─ types/                    # Shared TypeScript types
```

## Demo accounts (after seeding)

| Role | Email | Password |
|---|---|---|
| Member | `member.demo@gmail.com` | `password123` |
| Admin | Create in Supabase Auth, then run `seed-admin.sql` | (your choice) |

## Deploy to Vercel

1. Push this repo to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` = your deployed backend URL (e.g. `https://blog-app-server.vercel.app`)
4. Deploy

No extra build settings required — framework preset: **Next.js**.

## Supabase Auth redirect URLs

In Supabase Dashboard → **Authentication** → **URL configuration**, add:

| Setting | Value |
|---|---|
| Site URL | `https://your-frontend.vercel.app` |
| Redirect URLs | `http://localhost:3000/**`, `https://your-frontend.vercel.app/**` |

Auth cookies are managed by the Express backend (`httpOnly`), so the frontend does not need Supabase keys.

## Definition of done (core)

- [x] Blog list with search + pagination (10/page)
- [x] Blog detail: cover, up to 6 images, content, date, view count
- [x] Comments: Thai/number validation, approved-only display
- [x] Admin login + route guard
- [x] Admin CRUD blogs, publish/unpublish, slug editing
- [x] Admin approve/reject comments (reversible)
- [x] Member register + login
- [x] Loading, error, and empty states

Full system spec: [`blog-app-flow.MD`](blog-app-flow.MD) (local reference).
