export type SiteSettings = {
  id: string
  property_name: string
  tagline: string | null
  description: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  address: string | null
  google_maps_url: string | null
  check_in: string | null
  check_out: string | null
  facebook_url: string | null
  instagram_url: string | null
}

export type CmsPage = { id: string; title: string; slug: string; status: 'draft' | 'published'; meta_title: string | null; meta_description: string | null; canonical_url: string | null; og_image: string | null; no_index: boolean }
export type PageSection = { id: string; page_id: string; section_type: string; content: Record<string, unknown>; sort_order: number; is_visible: boolean }
export type Room = { id: string; name: string; slug: string; description: string | null; price: string | null; featured_image: string | null; is_visible: boolean; sort_order: number }
export type Amenity = { id: string; name: string; description: string | null; icon: string | null; sort_order: number; is_visible: boolean }
export type GalleryImage = { id: string; storage_path: string; public_url: string | null; alt_text: string | null; caption: string | null; sort_order: number; is_visible: boolean }
export type Faq = { id: string; question: string; answer: string; sort_order: number; is_visible: boolean }
