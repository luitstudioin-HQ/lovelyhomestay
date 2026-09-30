import Link from 'next/link'
import { adminList } from '@/lib/admin/data'
export default async function AdminPage() {
  const [pages, rooms, amenities, gallery, faqs, messages] = await Promise.all(['pages','rooms','amenities','gallery_images','faqs','contact_submissions'].map((table) => adminList(table as 'pages' | 'rooms' | 'amenities' | 'gallery_images' | 'faqs' | 'contact_submissions')))
  const cards = [['Pages', pages.length, '/admin/pages'], ['Rooms', rooms.length, '/admin/rooms'], ['Amenities', amenities.length, '/admin/amenities'], ['Gallery images', gallery.length, '/admin/gallery'], ['FAQs', faqs.length, '/admin/faqs'], ['New messages', messages.filter((m) => m.status === 'new').length, '/admin/messages']]
  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold">CMS administration</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Manage the content guests see across Lovely Homestay.</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label, count, href]) => <Link href={href as string} key={label as string} className="rounded-2xl border border-border bg-background p-5 hover:border-primary"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-semibold">{count}</p></Link>)}</div>
      <div><h2 className="text-lg font-semibold">Quick actions</h2><div className="mt-3 flex flex-wrap gap-3">{[['Edit Homepage','/admin/homepage'],['Manage Rooms','/admin/rooms'],['Manage Gallery','/admin/gallery'],['View Messages','/admin/messages']].map(([label,href])=><Link className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" href={href} key={href}>{label}</Link>)}</div></div>
    </section>
  )
}
