# 🍞 Roti Kebanggaan - Web Landing Page

Halo! 👋 Selamat datang di repository landing page resmi **Roti Kebanggaan**. Kita adalah bakery yang punya beberapa cabang asik di Jabodetabek. Website ini dibikin supaya pelanggan bisa cek menu, kasih review, sampai cari lowongan kerja dengan nyaman.

Project ini dibangun pake stack modern: **Next.js 14**, **Prisma**, **PostgreSQL**, dan **Docker**. 🚀

---

## ✨ Ada Fitur Apa Aja?

Gak cuma buat pajangan, website ini punya banyak fitur:
- **Landing Page Kece** — Intro, produk jagoan kita, cerita tentang kita, sampai lokasi cabang.
- **Katalog Menu** — Liat semua koleksi roti kita di sini.
- **Form Review** — Pelanggan bisa kasih ulasan bareng foto, kasih rating, dan pilih cabang mana yang mereka kunjungin.
- **Halaman Karir** — Buat yang mau gabung tim Roti Kebanggaan.
- **Admin Dashboard** — Manager bisa approve atau hapus review, lengkap sama login yang aman.

---

## 🛠️ Pake Teknologi Apa?

Kita pake teknologi yang bikin dev experience enak dan performa website ngebut:

| Bagian | Teknologi |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Bahasa** | TypeScript |
| **Styling** | Tailwind CSS + Framer Motion (biar animasinya smooth ✨) |
| **Database** | PostgreSQL + Prisma ORM |
| **Validasi** | Zod |
| **Deployment** | Docker + Docker Compose |

---

## 📍 Cabang Kita Dimana Aja?

Cek lokasi kita yang tersebar di beberapa titik:
- **Sorrento** (Gading Serpong)
- **Beryl** (Gading Serpong)
- **Downtown** (Gading Serpong)
- **Greenlake** (Green Lake City)
- **Gafoy** (Mall Kelapa Gading, Jakut)
- **Grand Indonesia** (Jakarta Pusat)

---

## 🚀 Cara Jalanin di Lokal

Mau coba running di laptop sendiri? Gampang, ikutin step ini ya:

### 1. Ambil Code & Install
```bash
git clone https://github.com/dnhmyy/rotikebanggaan_website.git
cd rotikebanggaan_website
npm install
```

### 2. Atur Environment
Copy dulu filenya:
```bash
cp .env.example .env
```
Jangan lupa isi values-nya di `.env`. Contoh isinya:
- `DATABASE_URL`: Link ke database PostgreSQL kamu.
- `ADMIN_SECRET`: Password rahasia buat admin (bisa generate pake `openssl rand -base64 32`).
- `NEXT_PUBLIC_BASE_URL`: Biasanya `http://localhost:3000`.

### 3. Setup Database & Run!
```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```
Sekarang buka [http://localhost:3000](http://localhost:3000) dan *voila!* 🎉

---

## 🐳 Deployment (Pake Docker)

Kalo mau dideploy ke server pake Docker, caranya tinggal:
1. Atur `.env` di server (pake data produksi).
2. Jalankan: `docker compose up -d --build`
3. Jangan lupa migrasi DB: `docker compose exec app npx prisma migrate deploy`

---

## 🔐 Admin Dashboard & API

Dashboard admin bisa diakses di `/admin/reviews`. Tenang, udah dilindungi:
- Cookie sesi `httpOnly`.
- Rate limiting (biar gak kena brute force).
- Middleware protection.

Untuk API-nya, kita punya endpoint buat ambil/kirim review, upload foto, dan login admin.

---

## 📜 Shortcuts

- `npm run dev` — Mulai ngoding (development server).
- `npm run build` — Siapin buat produksi.
- `npm run lint` — Cek kalo ada code yang berantakan.

---

## 👨‍💻 Developer

Dibikin dengan ❤️ oleh **Akhdan** — [@dnhmyy](https://github.com/dnhmyy)
