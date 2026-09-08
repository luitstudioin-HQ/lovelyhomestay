'use client'

/**
 * Custom next/image loader, wired up via `images.loaderFile` in next.config.mjs.
 *
 * Pexels already resizes on its own CDN via `?w=`, so pointing straight at it
 * costs zero Vercel Image Optimization transformations and cache reads. That is
 * where nearly all of this project's image volume lives (172 pexels URLs in
 * src/data vs ~20 local files).
 *
 * loaderFile applies to *every* <Image>, including static imports from
 * src/images — those still go through Next's optimizer via the fallback below.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith('https://images.pexels.com/')) {
    const url = new URL(src)
    url.searchParams.set('auto', 'compress')
    url.searchParams.set('cs', 'tinysrgb')
    url.searchParams.set('w', String(width))
    return url.toString()
  }

  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`
}
