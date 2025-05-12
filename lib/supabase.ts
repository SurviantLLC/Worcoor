import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a single supabase client for the browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a server-side client (to be used in Server Components or API routes)
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || ""
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  return createClient(supabaseUrl, supabaseServiceKey)
}
