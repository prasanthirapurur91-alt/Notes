import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ttmkugpqtjuarthoeaiw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_srX0yYrtln5m1lIFyw-rwA_JbTWFeJT';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_publishable_srX0yYrtln5m1lIFyw-rwA_JbTWFeJT';

// Client for browser / public read operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin Service Role client for trusted server-side operations (creating orders, admin database queries)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
