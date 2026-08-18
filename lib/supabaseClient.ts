import { createBrowserClient } from '@supabase/ssr';

// Fallback values ensure client creation never throws a fatal runtime exception
const SUPABASE_URL = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co';

const SUPABASE_ANON_KEY = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-actual-anon-key-here';

export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
