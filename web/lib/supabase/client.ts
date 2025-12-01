import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// For backward compatibility, but should use getSupabaseClient() in hooks
export const supabase = typeof window !== 'undefined' ? getSupabaseClient() : (() => {
  // Return a mock client for SSR that will error if used
  return {
    from: () => {
      throw new Error('Supabase client not available during SSR. Use getSupabaseClient() in client components only.')
    }
  } as any
})()

