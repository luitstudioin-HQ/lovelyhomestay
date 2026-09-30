import { requireAdmin } from '@/lib/admin/auth'
import Link from 'next/link'
import { HomeIcon, BuildingOffice2Icon, PhotoIcon, QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon, MagnifyingGlassIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { logout } from './actions'

const navigation = [
  ['Dashboard', '/admin', HomeIcon], ['Homepage', '/admin/homepage', BuildingOffice2Icon], ['About', '/admin/about', DocumentTextIcon], ['Contact', '/admin/contact', ChatBubbleLeftRightIcon], ['Rooms', '/admin/rooms', BuildingOffice2Icon], ['Amenities', '/admin/amenities', BuildingOffice2Icon], ['Gallery', '/admin/gallery', PhotoIcon], ['FAQs', '/admin/faqs', QuestionMarkCircleIcon], ['Messages', '/admin/messages', ChatBubbleLeftRightIcon], ['SEO', '/admin/seo', MagnifyingGlassIcon], ['Settings', '/admin/settings', Cog6ToothIcon],
] as const

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <aside className="border-b border-border bg-background lg:fixed lg:inset-y-0 lg:w-64 lg:border-r lg:border-b-0">
        <div className="px-5 py-6"><Link href="/admin" className="text-lg font-semibold">Lovely Homestay<span className="block text-xs font-normal text-muted-foreground">Content studio</span></Link></div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:block">{navigation.map(([label, href, Icon]) => <Link key={href} href={href} className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-900"><Icon className="size-4" />{label}</Link>)}<form action={logout}><button className="flex w-full shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-900">Logout</button></form></nav>
      </aside>
      <main className="mx-auto max-w-7xl px-5 py-8 lg:ml-64 lg:px-10">{children}</main>
    </div>
  )
}
