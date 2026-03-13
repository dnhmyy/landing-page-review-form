# Roti Kebanggaan — Website

Landing page resmi **Roti Kebanggaan**, bakery dengan beberapa cabang di Jabodetabek. Dibangun dengan Next.js 14, Prisma, PostgreSQL, dan Docker.

## Fitur

- **Landing Page** — Hero, produk unggulan, about, lokasi cabang
- **Menu** — Katalog produk lengkap
- **Review** — Form ulasan pelanggan dengan foto, rating, dan filter cabang
- **Karir** — Halaman lowongan pekerjaan
- **Admin Dashboard** — Manajemen review (approve, hapus, filter) dengan proteksi login

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| Database | PostgreSQL + Prisma ORM |
| Validasi | Zod |
| Deployment | Docker + Docker Compose |

## Struktur Cabang

| Cabang | Lokasi |
|--------|--------|
| Sorrento | Gading Serpong |
| Beryl | Gading Serpong |
| Downtown | Gading Serpong |
| Greenlake | Green Lake City |
| Mall Kelapa Gading (Gafoy) | Jakarta Utara |
| Mall Grand Indonesia | Jakarta Pusat |

---

## Setup Lokal

### 1. Clone & Install

```bash
git clone https://github.com/dnhmyy/rotikebanggaan_website.git
cd rotikebanggaan_website
npm install
```

### 2. Konfigurasi Environment

```bash
cp .env.example .env  # lalu isi dengan nilai yang sesuai
```

Variabel yang dibutuhkan di `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/rotikebanggaan?schema=public"
ADMIN_SECRET=your_admin_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

> Generate `ADMIN_SECRET` yang kuat: `openssl rand -base64 32`

### 3. Setup Database

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Jalankan Dev Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Deployment (Docker)

### 1. Siapkan `.env` di server

Isi dengan nilai production yang sesungguhnya (DB password, ADMIN_SECRET, domain/IP).

### 2. Build & Jalankan

```bash
docker compose up -d --build
```

### 3. Jalankan Migrasi Database

```bash
docker compose exec app npx prisma migrate deploy
```

Aplikasi berjalan di port `3000`.

---

## API Endpoints

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/reviews` | Ambil review yang sudah approved | — |
| `POST` | `/api/reviews` | Submit review baru | — |
| `POST` | `/api/upload` | Upload foto review | Admin |
| `POST` | `/api/admin/login` | Login admin | — |
| `GET` | `/api/admin/login` | Cek status sesi admin | — |
| `GET` | `/api/admin/reviews` | Ambil semua review (termasuk pending) | Admin |

---

## Admin Dashboard

Akses di `/admin/reviews`. Dilindungi dengan:
- Cookie sesi `httpOnly`
- Rate limiting login: maks 5 percobaan / 15 menit
- Middleware server-side redirect untuk akses tanpa sesi

---

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint check
```

---

## Developer

**Akhdan** — [@dnhmyy](https://github.com/dnhmyy)
