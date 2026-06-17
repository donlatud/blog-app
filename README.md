# Blog App (Frontend)

Next.js frontend สำหรับระบบ Blog — เรียก REST API จาก [`blog-app-server`](../blog-app-server) (Express + Supabase)

## Getting Started

```bash
cp .env.example .env
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) — ต้องรัน backend (`blog-app-server`) และ seed ข้อมูลใน Supabase ก่อน (ดูด้านล่าง)

ตัวแปรสำคัญ:

| ตัวแปร | ค่าเริ่มต้น (local) |
|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` |

## Pagination (10 รายการต่อหน้า)

โจทย์ take-home กำหนด **pagination หน้าละ 10 รายการ** — frontend ใช้ `BLOG_PAGE_SIZE = 10` ใน [`src/constants/config.ts`](src/constants/config.ts) ให้ตรงกับ `PAGINATION.DEFAULT_LIMIT` ฝั่ง backend (`GET /api/blogs?limit=10`)

หน้ารวม blog ใช้ grid **2 คอลัมน์บน tablet/desktop** (`sm:grid-cols-2`) คู่กับ pagination **10 รายการต่อหน้า** — ได้ 5 แถวเต็ม (2×5) ไม่มีการ์ดเดี่ยวแถวสุดท้าย และยังตรง take-home spec

ถ้าต่อ API จริง ให้ส่ง `page` และ `limit=10` ไปที่ backend แล้วใช้ `meta.totalPages` จาก response

### เชื่อม Backend (Feature 1)

1. รัน `blog-app-server` ที่ port 4000
2. ใน Supabase SQL Editor: `schema.sql` แล้วตามด้วย `blog-app-server/supabase/seed.sql`
3. ตั้ง `NEXT_PUBLIC_API_URL=http://localhost:4000` ใน `.env` แทนการ slice ฝั่ง client

## โครงสร้างหลัก

```
src/
├─ app/page.tsx              # หน้า Landing
├─ components/
│  ├─ landing/               # LandingHero, LandingPageView
│  ├─ blog/                  # BlogCard, BlogGrid, SearchBar, Pagination
│  └─ layout/                # SiteHeader, SiteFooter, PageContainer
├─ constants/config.ts       # API URL, BLOG_PAGE_SIZE
└─ types/blog.ts
```

รายละเอียด flow ทั้งระบบ: [`blog-app-flow.MD`](blog-app-flow.MD) (local only)

## Deploy

Deploy แยกจาก backend บน Vercel — ตั้ง `NEXT_PUBLIC_API_URL` เป็น URL ของ API production
