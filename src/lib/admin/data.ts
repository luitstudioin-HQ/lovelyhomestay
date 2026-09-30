import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from './auth'

export async function adminList(table: 'pages' | 'page_sections' | 'rooms' | 'amenities' | 'gallery_images' | 'faqs' | 'contact_submissions') {
  await requireAdmin()
  const supabase = await createClient()
  const order = table === 'contact_submissions' ? 'created_at' : table === 'pages' ? 'updated_at' : 'sort_order'
  const { data, error } = await supabase.from(table).select('*').order(order, { ascending: table === 'contact_submissions' ? false : true })
  if (error) throw new Error(`Unable to load ${table}`)
  return data ?? []
}

export async function adminSettings() {
  await requireAdmin()
  const supabase = await createClient()
  const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle()
  if (error) throw new Error('Unable to load settings')
  return data
}
