import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qroefxkxincxwdddivls.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jmSl2u48Dkix9QFZTbmCdA_88v7vKrM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
