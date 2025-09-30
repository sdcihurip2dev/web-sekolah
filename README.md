# 🎓 SekolahKu Digital - School Website Template

A modern, full-stack school website template built with Next.js, Supabase, and Prisma. Features a public-facing landing site and a comprehensive admin dashboard for managing school content.

## 🚀 Features

### Public Website
- **Home Page** - Hero section, features, latest news, and call-to-action
- **About Page** - School history, vision & mission, achievements, and leadership
- **Activities Page** - Extracurricular activities and recent events
- **Blog Page** - News, articles, and announcements
- **Contact Page** - Contact form and school information

### Admin Dashboard
- **Overview** - Statistics and activity charts
- **Students Management** - CRUD operations for student data
- **Teachers Management** - Manage teachers and staff
- **Posts Management** - Create and manage blog posts, news, and announcements
- **Gallery Management** - Upload and manage photos
- **Settings** - Account and school information settings

## 📌 Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication & Database**: Supabase (PostgreSQL + Supabase Auth)
- **ORM**: Prisma
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

```
/src
  /app
    /(public)          # Public landing pages
      /about
      /activities
      /blog
      /contact
    /auth              # Authentication pages
      /login
    /dashboard         # Admin dashboard
      /overview
      /students
      /teachers
      /posts
      /gallery
      /settings
  /components
    /ui                # shadcn/ui components
    Navbar.tsx
    Footer.tsx
    DashboardSidebar.tsx
  /lib
    supabaseClient.ts  # Supabase configuration
    prisma.ts          # Prisma client
    constants.ts       # App constants
    utils.ts           # Utility functions
/prisma
  schema.prisma        # Database schema
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up here](https://supabase.com))
- Git installed

### 2. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd sd-cihurip-2

# Install dependencies
npm install
```

### 3. Configure Supabase

1. Create a new project in [Supabase Dashboard](https://app.supabase.com)
2. Go to **Project Settings** > **API**
3. Copy your project URL and anon key

### 4. Set Up Environment Variables

```bash
# Copy the environment template
cp env.template .env.local

# Edit .env.local with your Supabase credentials
```

Add the following to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### 5. Set Up Database

Run the SQL schema in your Supabase SQL Editor:

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

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🔐 Authentication

The application uses Supabase Auth for authentication. To create an admin user:

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add User** and create a new user with email/password
4. The user can then log in at `/auth/login`

## 📝 Customization

### Branding

Edit `src/lib/constants.ts` to customize:

```typescript
export const APP_NAME = "Your School Name";

export const BRAND_COLORS = {
  primary: "#2563eb",    // Change primary color
  secondary: "#16a34a",  // Change secondary color
};
```

### Navigation Links

Modify `NAV_LINKS` and `DASHBOARD_LINKS` in `src/lib/constants.ts` to add or remove menu items.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📚 Database Schema

The application uses the following database models:

- **User** - Teachers, staff, and admins
- **Student** - Student information
- **Post** - Blog posts, news, activities, announcements
- **Gallery** - Photo gallery
- **Message** - Contact form submissions

See `prisma/schema.prisma` for the complete schema definition.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues and questions:
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Check the [Supabase Documentation](https://supabase.com/docs)
- Check the [Prisma Documentation](https://www.prisma.io/docs)

## 🎯 Next Steps

After setup, you can:

1. **Add sample data** to test the application
2. **Customize the design** to match your school's branding
3. **Add more features** like student portals, online payments, etc.
4. **Connect real data** from your Supabase database
5. **Deploy to production** when ready

---

Built with ❤️ using Next.js, Supabase, and Prisma
