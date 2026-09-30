import 'server-only'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import type { SiteSettings } from './types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = await createClient()
  const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle()
  if (error) { console.error('Unable to load site settings', error.message); return null }
  return data as SiteSettings | null
}
