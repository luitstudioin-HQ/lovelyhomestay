import { login } from './actions'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const messages: Record<string, string> = {
  'not-configured': 'Supabase environment variables have not been configured.',
  'not-authorized': 'This account is not an active CMS administrator.',
  'invalid-input': 'Enter a valid email address and password.',
  'invalid-credentials': 'The email address or password was not accepted.',
}

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: admin } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', user.id)
        .eq('role', 'admin')
        .eq('is_active', true)
        .maybeSingle()
      if (admin) redirect('/admin')
    }
  }
  const { error } = await searchParams
  return <main className="container flex min-h-screen max-w-md items-center py-16"><form action={login} className="w-full space-y-5 rounded-3xl border border-border p-8 shadow-sm"><div><p className="text-sm text-muted-foreground">Lovely Homestay</p><h1 className="mt-1 text-3xl font-semibold">Admin sign in</h1></div>{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{messages[error] ?? 'Unable to sign in.'}</p>}<label className="block text-sm font-medium">Email<input required name="email" type="email" autoComplete="email" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" /></label><label className="block text-sm font-medium">Password<input required name="password" type="password" autoComplete="current-password" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" /></label><button type="submit" className="w-full rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground">Sign in</button></form></main>
}
