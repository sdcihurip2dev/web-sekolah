
# 🎓 School Website Fullstack Template (Next.js + Supabase + Prisma)

## 📝 Prompt

```
You are a professional fullstack web developer assistant.  
I want you to create a fullstack school website template with a public-facing landing site for visitors (students, parents, community) and an admin dashboard for school staff (teachers, admins).  
The app should integrate Supabase for authentication, database management, and file storage (for documents, images, gallery).  
```

---

## 📌 Purpose & Audience

Website sekolah dasar/menengah di Indonesia.
Landing page untuk publik (profil sekolah, kegiatan, berita, blog guru, galeri).
Admin dashboard untuk kepala sekolah, guru, dan staf administrasi.

---

## 📌 Tech Stack

* Framework: **Next.js (App Router) + TypeScript**
* Styling: **Tailwind CSS + shadcn/ui**
* Auth & Database: **Supabase (PostgreSQL + Supabase Auth)**
* ORM: **Prisma (integrated with Supabase)**
* Charts: **Recharts**
* Icons: **Lucide-react**

---

## 📌 Project Structure

```bash
/src
  /app
    /(public)
      /        # Landing pages: home, about, activities, blog, contact
    /dashboard # Admin-only pages
      /overview
      /students
      /teachers
      /posts
      /gallery
      /settings
    /auth
      /login
      /register
  /components
    /ui        # shared UI components: Button, Card, Table, Modal, Navbar, Sidebar
  /lib
    supabaseClient.ts   # Supabase setup
    constants.ts        # branding, theme colors, app configs
    utils.ts            # helper functions
  /db
    schema.prisma       # Prisma schema
  /styles
    globals.css
```

---

## 📌 Database Schema (SQL – Supabase PostgreSQL)

```sql
-- Users (teachers, staff, admins)
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  role text default 'teacher' check (role in ('admin','teacher','staff')),
  created_at timestamp default now()
);

-- Students
create table students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  class text not null,
  parent_contact text,
  created_at timestamp default now()
);

-- Posts (blog/news/activities)
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author_id uuid references users(id),
  category text check (category in ('news','activity','announcement','blog')) default 'news',
  created_at timestamp default now()
);

-- Gallery
create table gallery (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  uploaded_by uuid references users(id),
  created_at timestamp default now()
);

-- Messages (contact form)
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp default now()
);
```

---

## 📌 Prisma Schema (`schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // Supabase connection string
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  role         Role     @default(teacher)
  createdAt    DateTime @default(now())

  posts    Post[]
  gallery  Gallery[]
}

model Student {
  id            String   @id @default(uuid())
  name          String
  class         String
  parentContact String?
  createdAt     DateTime @default(now())
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  category  Category @default(news)
  createdAt DateTime @default(now())

  author   User? @relation(fields: [authorId], references: [id])
  authorId String?
}

model Gallery {
  id        String   @id @default(uuid())
  title     String?
  imageUrl  String
  createdAt DateTime @default(now())

  uploader   User?   @relation(fields: [uploadedBy], references: [id])
  uploadedBy String?
}

model Message {
  id        String   @id @default(uuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}

enum Role {
  admin
  teacher
  staff
}

enum Category {
  news
  activity
  announcement
  blog
}
```

---

## 📌 Pages & Features

**Landing site:**

* **Home** → Hero, Profil Sekolah, Kegiatan, Prestasi, CTA, Footer
* **About** → Sejarah, Visi Misi, Struktur Organisasi, Kepala Sekolah
* **Activities** → daftar kegiatan sekolah + detail
* **Blog** → berita, artikel guru, pengumuman
* **Contact** → form (nama, email, pesan → save ke DB `messages`)

**Admin Dashboard:**

* **Overview** → jumlah siswa, guru, postingan terbaru, grafik aktivitas
* **Students** → tabel data siswa (CRUD: add/edit/delete, search, filter by class)
* **Teachers** → tabel data guru/staf (CRUD)
* **Posts** → kelola artikel/berita (CRUD + rich text editor)
* **Gallery** → upload foto (Supabase storage)
* **Settings** → profil akun & branding sekolah

**Auth:**

* Login (guru/staf/admin dengan Supabase Auth)
* Register (hanya admin yang bisa tambah user baru)

---

## 📌 Constants & Config (`src/lib/constants.ts`)

```ts
export const APP_NAME = "SekolahKu Digital";

export const BRAND_COLORS = {
  primary: "#2563eb", // Tailwind blue-600
  secondary: "#16a34a", // Tailwind green-600
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/activities", label: "Activities" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const DASHBOARD_LINKS = [
  { href: "/dashboard/overview", label: "Overview" },
  { href: "/dashboard/students", label: "Students" },
  { href: "/dashboard/teachers", label: "Teachers" },
  { href: "/dashboard/posts", label: "Posts" },
  { href: "/dashboard/gallery", label: "Gallery" },
  { href: "/dashboard/settings", label: "Settings" },
];
```

---

## 📌 Deliverable

* Full **Next.js project structure** dengan landing page + admin dashboard.
* Supabase integration (auth, file storage, CRUD dengan DB).
* **Database schema SQL + Prisma schema** siap digunakan.
* Constants untuk kustomisasi cepat.
* Boilerplate siap jalan.
* README Markdown untuk setup project.
