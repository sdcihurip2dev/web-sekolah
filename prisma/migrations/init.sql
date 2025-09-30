-- Initial database schema for SekolahKu Digital
-- Run this SQL in your Supabase SQL Editor

-- Users (teachers, staff, admins)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'teacher' CHECK (role IN ('admin','teacher','staff')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Students
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  parent_contact TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Posts (blog/news/activities)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  category TEXT CHECK (category IN ('news','activity','announcement','blog')) DEFAULT 'news',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gallery
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  image_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages (contact form)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_students_class ON students(class);
CREATE INDEX idx_gallery_created_at ON gallery(created_at DESC);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
