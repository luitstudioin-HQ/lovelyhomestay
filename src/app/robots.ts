import type { MetadataRoute } from 'next'

// Preview/portfolio deploy — no SEO needed. Blocking crawlers is the single
// biggest lever on Vercel Edge Requests / Function Invocations.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
