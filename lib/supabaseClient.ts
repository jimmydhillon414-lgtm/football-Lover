import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aapxrmfplybosmurlnge.supabase.co';

const SUPABASE_ANON_KEY = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Rak2v14BmMO9yrBTTYx2Dw_OVDcOCcF';

export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
