import type { Metadata } from 'next'

export const SITE_URL = 'https://lovelyhomestay.net'
export const SITE_NAME = 'Lovely Homestay'
export const SITE_EMAIL = 'nazuneog@gmail.com'
export const SITE_DESCRIPTION =
  'Stay at Lovely Homestay near Six Mile and VIP Road/Panjabari Road in Guwahati, Assam. Enjoy comfortable accommodation with Wi-Fi, parking, kitchen facilities and everyday essentials.'
export const SITE_IMAGE = '/images/lovely-homestay/bedroom-main.webp'
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/sPNUnzCjtkEtrJ7x6'
export const SITE_ADDRESS =
  'House No. 3, Jana Path, Bye Lane 17, F.A. Ahmed Nagar, Panjabari Road, Six Mile, Guwahati, Assam 781022'

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}

export function createPageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = absoluteUrl(path)
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: SITE_IMAGE, alt: 'Bedroom at Lovely Homestay in Guwahati' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [SITE_IMAGE] },
  }
}
