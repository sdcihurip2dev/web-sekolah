# 🚀 Quick Setup Guide

Follow these steps to get your school website up and running quickly.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be ready (takes about 2 minutes)

## Step 3: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon)
2. Click on **API** in the left sidebar
3. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

## Step 4: Create Environment File

1. Copy `env.template` to `.env.local`:
   ```bash
   cp env.template .env.local
   ```

2. Open `.env.local` and paste your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

3. For `DATABASE_URL`:
   - Go to **Settings** > **Database** in Supabase
   - Copy the **Connection string** under "Connection pooling"
   - Replace `[YOUR-PASSWORD]` with your database password

## Step 5: Set Up Database Tables

1. In Supabase dashboard, click on **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy the entire content from `prisma/migrations/init.sql`
4. Paste it into the SQL editor
5. Click **Run** to create all tables

## Step 6: Generate Prisma Client

```bash
npx prisma generate
```

## Step 7: Create Admin User

1. In Supabase dashboard, go to **Authentication** > **Users**
2. Click **Add user** > **Create new user**
3. Enter:
   - Email: `admin@sekolahku.sch.id` (or your preferred email)
   - Password: Create a strong password
4. Click **Create user**

## Step 8: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 9: Test the Application

### Test Public Pages
- Home: [http://localhost:3000](http://localhost:3000)
- About: [http://localhost:3000/about](http://localhost:3000/about)
- Activities: [http://localhost:3000/activities](http://localhost:3000/activities)
- Blog: [http://localhost:3000/blog](http://localhost:3000/blog)
- Contact: [http://localhost:3000/contact](http://localhost:3000/contact)

### Test Admin Dashboard
1. Go to [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
2. Login with the admin credentials you created
3. You should be redirected to the dashboard

## 🎨 Customization

### Change School Name and Colors

Edit `src/lib/constants.ts`:

```typescript
export const APP_NAME = "Your School Name Here";

export const BRAND_COLORS = {
  primary: "#2563eb",    // Change to your school color
  secondary: "#16a34a",  // Change to your secondary color
};
```

### Update School Information

Edit the content in:
- `src/app/page.tsx` - Home page
- `src/app/about/page.tsx` - About page
- `src/components/Footer.tsx` - Footer contact info

## 🐛 Troubleshooting

### Error: "Invalid API key"
- Double-check your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Make sure there are no extra spaces or quotes

### Error: "Cannot connect to database"
- Verify your `DATABASE_URL` is correct
- Make sure you replaced `[YOUR-PASSWORD]` with your actual database password
- Check if your Supabase project is active

### Login not working
- Make sure you created a user in Supabase Authentication
- Check that the email and password are correct
- Verify Supabase Auth is enabled in your project settings

### Tables not found
- Make sure you ran the SQL migration in Supabase SQL Editor
- Check the **Table Editor** in Supabase to verify tables exist

## 📝 Next Steps

1. **Add sample data** - Add some students, teachers, and posts to test
2. **Customize design** - Update colors, fonts, and layouts
3. **Add real content** - Replace placeholder text with your school info
4. **Set up file storage** - Configure Supabase Storage for image uploads
5. **Deploy** - Deploy to Vercel or your preferred hosting platform

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Visit [Next.js Docs](https://nextjs.org/docs)
- Visit [Supabase Docs](https://supabase.com/docs)
- Visit [Prisma Docs](https://www.prisma.io/docs)

---

Happy building! 🎉
