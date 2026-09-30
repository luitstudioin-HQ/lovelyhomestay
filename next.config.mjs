/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      '/car/:path*',
      '/experience/:path*',
      '/flight/:path*',
      '/car-search/:path*',
      '/experience-search/:path*',
      '/flight-search/:path*',
      '/car-listings/:path*',
      '/experience-listings/:path*',
      '/stay-search/:path*',
      '/stay-search-with-map/:path*',
      '/stay-listings/:path*',
      '/add-listing/:path*',
      '/checkout/:path*',
      '/pay-done/:path*',
      '/subscription/:path*',
      '/account/:path*',
      '/account-billing/:path*',
      '/account-password/:path*',
      '/account-savelists/:path*',
      '/login/:path*',
      '/signup/:path*',
      '/forgot-password/:path*',
      '/car-categories/:path*',
      '/experience-categories/:path*',
      '/flight-categories/:path*',
      '/stay-categories/:path*',
      '/authors/:path*',
      '/blog/:path*',
    ].map((source) => ({ source, destination: '/', permanent: false }))
  },
  images: {
    // Pexels URLs bypass the Vercel optimizer entirely; local files still use it.
    loaderFile: './src/lib/image-loader.ts',
    minimumCacheTTL: 2678400 * 6, // 3 months
    // One format instead of AVIF+WebP halves transformations for local images.
    formats: ['image/webp'],
    // Defaults are 8 + 8 widths, i.e. up to 16 variants per source image.
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [64, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
