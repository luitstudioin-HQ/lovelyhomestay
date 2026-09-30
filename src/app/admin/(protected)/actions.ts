'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import sharp from 'sharp'

const text = (data: FormData, key: string) => String(data.get(key) ?? '').trim()
const checkbox = (data: FormData, key: string) => data.get(key) === 'on'
const number = (data: FormData, key: string) => Math.max(0, Number.parseInt(text(data, key), 10) || 0)
const back = (data: FormData, message: string) => redirect(`${text(data, 'returnTo')}?message=${encodeURIComponent(message)}`)

export async function saveRecord(data: FormData) {
  await requireAdmin()
  const table = text(data, 'table')
  const id = text(data, 'id')
  const supabase = await createClient()
  const records: Record<string, Record<string, unknown>> = {
    rooms: { name: text(data, 'name'), slug: text(data, 'slug'), description: text(data, 'description') || null, price: text(data, 'price') || null, featured_image: text(data, 'featured_image') || null, is_visible: checkbox(data, 'is_visible'), sort_order: number(data, 'sort_order') },
    amenities: { name: text(data, 'name'), description: text(data, 'description') || null, icon: text(data, 'icon') || null, is_visible: checkbox(data, 'is_visible'), sort_order: number(data, 'sort_order') },
    faqs: { question: text(data, 'question'), answer: text(data, 'answer'), is_visible: checkbox(data, 'is_visible'), sort_order: number(data, 'sort_order') },
    gallery_images: { storage_path: text(data, 'storage_path'), public_url: text(data, 'public_url') || null, alt_text: text(data, 'alt_text') || null, caption: text(data, 'caption') || null, is_visible: checkbox(data, 'is_visible'), sort_order: number(data, 'sort_order') },
  }
  const record = records[table]
  if (!record || Object.values(record).some((value) => value === '')) back(data, 'Please complete required fields')
  const query = id ? supabase.from(table).update(record).eq('id', id) : supabase.from(table).insert(record)
  const { error } = await query
  if (error) back(data, error.message)
  revalidatePath('/')
  revalidatePath('/stay')
  back(data, 'Saved')
}

export async function deleteRecord(data: FormData) {
  await requireAdmin()
  const table = text(data, 'table'); const id = text(data, 'id')
  const supabase = await createClient()
  if (table === 'gallery_images') {
    const { data: image } = await supabase.from('gallery_images').select('storage_path, public_url').eq('id', id).maybeSingle()
    if (!image) {
      back(data, 'Image not found')
      return
    }
    const ownedPath = image.storage_path && !image.storage_path.startsWith('http') && !image.storage_path.startsWith('public/')
    if (ownedPath) {
      const { error: storageError } = await supabase.storage.from('site-media').remove([image.storage_path])
      if (storageError) back(data, `Could not delete storage image: ${storageError.message}`)
    }
  }
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) back(data, error.message)
  revalidatePath('/')
  revalidatePath('/stay')
  back(data, 'Deleted')
}

export async function saveSettings(data: FormData) {
  await requireAdmin()
  const supabase = await createClient()
  const payload = Object.fromEntries(['property_name','tagline','description','phone','email','whatsapp','address','google_maps_url','check_in','check_out','facebook_url','instagram_url'].map((key) => [key, text(data, key) || null]))
  if (!payload.property_name) back(data, 'Property name is required')
  const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle()
  const { error } = existing ? await supabase.from('site_settings').update(payload).eq('id', existing.id) : await supabase.from('site_settings').insert(payload)
  if (error) back(data, error.message)
  revalidatePath('/', 'layout')
  revalidatePath('/contact')
  back(data, 'Settings saved')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export async function saveHomepageSection(data: FormData) {
  await requireAdmin()
  const supabase = await createClient()
  const type = text(data, 'section_type')
  const content = { heading: text(data, 'heading'), description: text(data, 'description'), buttonText: text(data, 'button_text'), buttonUrl: text(data, 'button_url'), image: text(data, 'image') }
  const { data: page } = await supabase.from('pages').select('id').eq('slug', '/').maybeSingle()
  if (!page) {
    back(data, 'Homepage is unavailable')
    return
  }
  const { data: existing } = await supabase.from('page_sections').select('id').eq('page_id', page.id).eq('section_type', type).maybeSingle()
  const payload = { page_id: page.id, section_type: type, content, is_visible: checkbox(data, 'is_visible'), sort_order: number(data, 'sort_order') }
  const { error } = existing ? await supabase.from('page_sections').update(payload).eq('id', existing.id) : await supabase.from('page_sections').insert(payload)
  if (error) back(data, error.message)
  revalidatePath('/')
  revalidatePath('/stay')
  back(data, 'Homepage section saved')
}

export async function saveAbout(data: FormData) {
  await requireAdmin(); const supabase = await createClient()
  const { data: page } = await supabase.from('pages').select('id').eq('slug', '/about').maybeSingle()
  if (!page) { back(data, 'About page is unavailable'); return }
  const content = { eyebrow: text(data, 'eyebrow'), heading: text(data, 'heading'), description: text(data, 'description'), facts: [text(data, 'fact_one'), text(data, 'fact_two'), text(data, 'fact_three')], ctaText: text(data, 'cta_text'), ctaUrl: text(data, 'cta_url') }
  const { data: existing } = await supabase.from('page_sections').select('id').eq('page_id', page.id).eq('section_type', 'about').maybeSingle()
  const { error } = existing ? await supabase.from('page_sections').update({ content, is_visible: checkbox(data, 'is_visible') }).eq('id', existing.id) : await supabase.from('page_sections').insert({ page_id: page.id, section_type: 'about', content, is_visible: checkbox(data, 'is_visible'), sort_order: 0 })
  if (error) back(data, error.message)
  revalidatePath('/about'); back(data, 'About saved')
}

export async function savePage(data: FormData) {
  await requireAdmin(); const supabase = await createClient(); const id=text(data,'id'); const title=text(data,'title'); const raw=text(data,'slug'); const slug=raw==='/'?'/':'/'+raw.replace(/^\/+|\/+$/g,'').toLowerCase().replace(/[^a-z0-9/-]+/g,'-').replace(/-+/g,'-')
  if(!title||!slug||slug==='/-') back(data,'A title and valid slug are required')
  const { data: duplicate }=await supabase.from('pages').select('id').eq('slug',slug).maybeSingle(); if(duplicate&&duplicate.id!==id) back(data,'That slug is already in use')
  const payload={title,slug,status:text(data,'status')==='draft'?'draft':'published'}; const {error}=id?await supabase.from('pages').update(payload).eq('id',id):await supabase.from('pages').insert(payload)
  if(error) back(data,error.message); back(data,'Page saved')
}

export async function archivePage(data: FormData) { await requireAdmin(); const supabase=await createClient(); const id=text(data,'id'); const {error}=await supabase.from('pages').update({status:'draft'}).eq('id',id); if(error) back(data,error.message); back(data,'Page archived') }

export async function uploadGalleryImage(data: FormData) {
  await requireAdmin()
  const file = data.get('file')
  const returnTo = text(data, 'returnTo') || '/admin/gallery'
  if (!(file instanceof File) || file.size === 0) redirect(`${returnTo}?message=Choose an image`)
  const allowed = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
  if (!allowed.has(file.type) || file.size > 8 * 1024 * 1024) redirect(`${returnTo}?message=Use a JPEG, PNG, WebP or AVIF under 8 MB`)
  const bytes = Buffer.from(await file.arrayBuffer())
  let metadata: sharp.Metadata
  try { metadata = await sharp(bytes).metadata() } catch { redirect(`${returnTo}?message=Invalid image file`) }
  if (!metadata!.width || !metadata!.height || metadata!.width > 6000 || metadata!.height > 6000) redirect(`${returnTo}?message=Image dimensions must be below 6000px`)
  const extension = file.type.split('/')[1].replace('jpeg', 'jpg')
  const path = `gallery/${crypto.randomUUID()}.${extension}`
  const supabase = await createClient()
  const { error: uploadError } = await supabase.storage.from('site-media').upload(path, bytes, { contentType: file.type, upsert: false })
  if (uploadError) redirect(`${returnTo}?message=${encodeURIComponent(uploadError.message)}`)
  const { data: url } = supabase.storage.from('site-media').getPublicUrl(path)
  const { error } = await supabase.from('gallery_images').insert({ storage_path: path, public_url: url.publicUrl, alt_text: text(data, 'alt_text') || null, caption: text(data, 'caption') || null, is_visible: checkbox(data, 'is_visible'), sort_order: number(data, 'sort_order') })
  if (error) { await supabase.storage.from('site-media').remove([path]); redirect(`${returnTo}?message=${encodeURIComponent(error.message)}`) }
  revalidatePath('/')
  revalidatePath('/stay')
  redirect(`${returnTo}?message=Image uploaded`)
}

const sectionTypes = new Set(['hero','about','highlights','amenities','rooms','gallery','faq','cta','contact'])
export async function saveManagedSection(data: FormData) { await requireAdmin(); const supabase=await createClient(); const id=text(data,'id'), pageId=text(data,'page_id'), type=text(data,'section_type'); if(!sectionTypes.has(type)) back(data,'Unsupported section type'); const {data:page}=await supabase.from('pages').select('slug').eq('id',pageId).maybeSingle(); if(!page){back(data,'Page not found');return}; const content={heading:text(data,'heading'),description:text(data,'description'),buttonText:text(data,'button_text'),buttonUrl:text(data,'button_url'),image:text(data,'image')}; const payload={page_id:pageId,section_type:type,content,is_visible:checkbox(data,'is_visible'),sort_order:number(data,'sort_order')}; const {error}=id?await supabase.from('page_sections').update(payload).eq('id',id):await supabase.from('page_sections').insert(payload); if(error)back(data,error.message); revalidatePath(page.slug); back(data,'Section saved') }
export async function deleteSection(data: FormData){await requireAdmin();const supabase=await createClient();const id=text(data,'id'),pageId=text(data,'page_id');const {data:page}=await supabase.from('pages').select('slug').eq('id',pageId).maybeSingle();const {error}=await supabase.from('page_sections').delete().eq('id',id).eq('page_id',pageId);if(error)back(data,error.message);if(page)revalidatePath(page.slug);back(data,'Section deleted')}
export async function moveSection(data: FormData){await requireAdmin();const supabase=await createClient();const id=text(data,'id'),pageId=text(data,'page_id'),direction=text(data,'direction');const {data:page}=await supabase.from('pages').select('slug').eq('id',pageId).maybeSingle();const {data:rows}=await supabase.from('page_sections').select('id,sort_order').eq('page_id',pageId).order('sort_order');if(!rows){back(data,'Sections unavailable');return}const index=rows.findIndex(r=>r.id===id);const target=direction==='up'?index-1:index+1;if(index<0||target<0||target>=rows.length){back(data,'Section cannot move further');return}const a=rows[index],b=rows[target];await supabase.from('page_sections').update({sort_order:-1}).eq('id',a.id).eq('page_id',pageId);const {error}=await supabase.from('page_sections').update({sort_order:a.sort_order}).eq('id',b.id).eq('page_id',pageId);if(error)back(data,error.message);await supabase.from('page_sections').update({sort_order:b.sort_order}).eq('id',a.id).eq('page_id',pageId);if(page)revalidatePath(page.slug);back(data,'Section moved')}
