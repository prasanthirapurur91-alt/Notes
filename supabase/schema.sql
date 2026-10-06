-- ===================================================
-- PREP LIBRARY — COMPLETE SUPABASE DATABASE MIGRATION
-- Copy and paste this script into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ===================================================

-- 1. Drop existing tables to refresh cleanly if needed
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.notes CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;

-- 2. Create Categories Table (Stores category pricing & category Google Drive links)
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_name TEXT DEFAULT 'BookOpen',
  price NUMERIC NOT NULL DEFAULT 49,
  currency TEXT DEFAULT 'INR',
  drive_link TEXT,
  preview_pdf_url TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Products Table (Stores Overall All-Access Pass & Bundles)
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  product_type TEXT NOT NULL CHECK (product_type IN ('all_notes', 'category', 'bundle')),
  price NUMERIC NOT NULL DEFAULT 99,
  currency TEXT DEFAULT 'INR',
  drive_link TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Notes Table (Stores individual PDF study sheets & preview files)
CREATE TABLE public.notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id TEXT REFERENCES public.categories(id) ON DELETE CASCADE,
  category_name TEXT NOT NULL,
  subject TEXT,
  description TEXT,
  pages_count INTEGER DEFAULT 30,
  questions_count INTEGER DEFAULT 50,
  file_url TEXT,
  preview_pdf_url TEXT,
  downloadable BOOLEAN DEFAULT true,
  is_demo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Orders Table (Customer purchase records)
CREATE TABLE public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT,
  email TEXT NOT NULL,
  product_id TEXT,
  product_type TEXT NOT NULL DEFAULT 'all_notes',
  product_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_provider TEXT DEFAULT 'razorpay',
  transaction_id TEXT UNIQUE NOT NULL,
  payment_status TEXT DEFAULT 'paid',
  delivery_status TEXT DEFAULT 'sent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Insert Default Initial Products (Overall Pass & Default Categories)
INSERT INTO public.products (id, name, slug, description, product_type, price, currency, drive_link, active, sort_order)
VALUES 
  (
    'prod-all-notes',
    'Complete PDF Notes Collection All-Access Pass',
    'complete-all-access-notes',
    'Complete lifetime access to all handwritten technical PDF notes across all categories.',
    'all_notes',
    99,
    'INR',
    'https://drive.google.com/drive/folders/1PrasanthiViewsNotesBundleAccess2026SecureDriveLink',
    true,
    1
  );

INSERT INTO public.categories (id, name, slug, description, icon_name, price, currency, drive_link, active, sort_order)
VALUES
  ('cat-programming', 'Programming Notes', 'programming', 'Java, Python, C++, and JS syntax and core patterns.', 'Code', 49, 'INR', 'https://drive.google.com/drive/folders/1ProgrammingNotesDriveFolder', true, 1),
  ('cat-backend', 'Backend Development Notes', 'backend-development', 'REST APIs, Microservices, Spring Boot, and Node.js.', 'Server', 49, 'INR', 'https://drive.google.com/drive/folders/1BackendNotesDriveFolder', true, 2),
  ('cat-dsa', 'DSA & Algorithms', 'dsa-algorithms', 'Data structures diagrams, time complexity, and LeetCode top patterns.', 'Binary', 49, 'INR', 'https://drive.google.com/drive/folders/1DSANotesDriveFolder', true, 3),
  ('cat-system-design', 'System Design Notes', 'system-design', 'High-level & Low-level design diagrams and scalability blueprints.', 'Layout', 59, 'INR', 'https://drive.google.com/drive/folders/1SystemDesignNotesDriveFolder', true, 4),
  ('cat-testing', 'Testing & Automation Notes', 'testing-automation', 'Selenium, Playwright, API testing, and SDET frameworks.', 'CheckCircle', 49, 'INR', 'https://drive.google.com/drive/folders/1TestingNotesDriveFolder', true, 5),
  ('cat-devops', 'DevOps & Cloud Notes', 'devops-cloud', 'Docker, Kubernetes, AWS core services, and CI/CD pipelines.', 'Cloud', 49, 'INR', 'https://drive.google.com/drive/folders/1DevOpsNotesDriveFolder', true, 6);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 8. RLS Read & Access Policies
CREATE POLICY "Allow public read for active categories" ON public.categories FOR SELECT USING (active = true);
CREATE POLICY "Allow public read for active products" ON public.products FOR SELECT USING (active = true);
CREATE POLICY "Allow public read for notes" ON public.notes FOR SELECT USING (true);
CREATE POLICY "Allow service role full management for orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow service role full management for products" ON public.products FOR ALL USING (true);
CREATE POLICY "Allow service role full management for categories" ON public.categories FOR ALL USING (true);
CREATE POLICY "Allow service role full management for notes" ON public.notes FOR ALL USING (true);
