import { createClient } from '@supabase/supabase-js';

// Vercel 환경변수 또는 .env.local 에서 값을 가져옵니다. 
// 빌드 에러 방지를 위해 기본 임시 URL 포맷을 제공합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http') 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
  : 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
