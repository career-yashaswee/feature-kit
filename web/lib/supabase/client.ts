import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { validateEnv } from '@/lib/env'

let supabaseClient: SupabaseClient | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    const env = validateEnv()
    supabaseClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
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

