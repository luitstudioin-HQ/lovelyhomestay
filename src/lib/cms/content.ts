import 'server-only'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import type { Amenity, CmsPage, Faq, GalleryImage, PageSection, Room } from './types'

async function query<T>(table: string, filters: Record<string, string | boolean> = {}): Promise<T[]> {
  if (!isSupabaseConfigured()) return []
  const supabase = await createClient()
  let request = supabase.from(table).select('*')
  for (const [key, value] of Object.entries(filters)) request = request.eq(key, value)
  const { data, error } = await request.order('sort_order', { ascending: true })
  if (error) { console.error(`Unable to load ${table}`, error.message); return [] }
  return data as T[]
}

export async function getPageBySlug(slug: string): Promise<CmsPage | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = await createClient()
  const { data, error } = await supabase.from('pages').select('*').eq('slug', slug).eq('status', 'published').maybeSingle()
  if (error) { console.error('Unable to load page', error.message); return null }
  return data as CmsPage | null
}
export const getPageSections = (pageId: string) => query<PageSection>('page_sections', { page_id: pageId, is_visible: true })
export const getPublishedRooms = () => query<Room>('rooms', { is_visible: true })
export const getVisibleAmenities = () => query<Amenity>('amenities', { is_visible: true })
export const getVisibleGalleryImages = () => query<GalleryImage>('gallery_images', { is_visible: true })
export const getVisibleFAQs = () => query<Faq>('faqs', { is_visible: true })
export async function getHomepageSections() {
  const page = await getPageBySlug('/')
  return page ? getPageSections(page.id) : []
}
