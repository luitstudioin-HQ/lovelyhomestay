import 'server-only'
import { redirect } from 'next/navigation'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'

export async function requireAdmin() {
  if (!isSupabaseConfigured()) redirect('/admin/login?error=not-configured')
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: admin } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .eq('role', 'admin')
    .eq('is_active', true)
    .maybeSingle()
  if (!admin) redirect('/admin/login?error=not-authorized')
  return user
}
