-- ===================================================
-- PREP LIBRARY — ORDERS DATABASE SCHEMA (SUPABASE)
-- Copy and paste this script into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ttmkugpqtjuarthoeaiw/sql
-- ===================================================

-- 1. Drop old unused tables cleanly if they exist
DROP TABLE IF EXISTS public.notes CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;

-- 2. Create Orders Table (Customer purchase records + Google Drive delivery link)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  product_id TEXT DEFAULT 'prod-all-notes',
  product_type TEXT NOT NULL DEFAULT 'all_notes',
  product_name TEXT NOT NULL DEFAULT 'Complete All-Access PDF Notes Pass',
  amount NUMERIC NOT NULL DEFAULT 199,
  currency TEXT DEFAULT 'INR',
  payment_provider TEXT DEFAULT 'razorpay',
  transaction_id TEXT UNIQUE NOT NULL,
  payment_status TEXT DEFAULT 'paid',
  delivery_status TEXT DEFAULT 'sent',
  google_drive_link TEXT DEFAULT 'https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. RLS Management Policy
CREATE POLICY "Allow service role full management for orders" 
ON public.orders FOR ALL USING (true);
