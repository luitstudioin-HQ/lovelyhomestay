'use server'

import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  if (!isSupabaseConfigured()) redirect('/admin/login?error=not-configured')
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  if (!/^\S+@\S+\.\S+$/.test(email) || !password) redirect('/admin/login?error=invalid-input')
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect('/admin/login?error=invalid-credentials')
  const { data: { user } } = await supabase.auth.getUser()
  const { data: admin } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user?.id ?? '')
    .eq('role', 'admin')
    .eq('is_active', true)
    .maybeSingle()
  if (!admin) redirect('/admin/login?error=not-authorized')
  redirect('/admin')
}
