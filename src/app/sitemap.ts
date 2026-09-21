import type { MetadataRoute } from 'next'
import { absoluteUrl, SITE_URL } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/about'), changeFrequency: 'yearly', priority: 0.7 },
    { url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.7 },
    { url: absoluteUrl('/privacy-policy'), changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/terms-and-conditions'), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
