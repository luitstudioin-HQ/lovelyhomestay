import { ThemeProvider } from '@/components/theme-provider'
import { DirectionProvider } from '@/components/ui/direction'
import { cn } from '@/lib/utils'
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site-config'
import '@/styles/tailwind.css'
import clsx from 'clsx'
import { Metadata } from 'next'
import { Google_Sans_Flex, Playfair_Display } from 'next/font/google'
import 'rc-slider/assets/index.css'

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-sans',
})

const playfair_display = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Lovely Homestay',
    default: 'Lovely Homestay | Comfortable Stay in Guwahati, Assam',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'homestay in Guwahati',
    'homestay near Six Mile Guwahati',
    'homestay near VIP Road Guwahati',
    'homestay near Panjabari Road Guwahati',
    'accommodation in Guwahati',
  ],
  openGraph: {
    title: 'Lovely Homestay | Comfortable Stay in Guwahati, Assam',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [{ url: SITE_IMAGE, alt: 'Bedroom at Lovely Homestay in Guwahati' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lovely Homestay | Comfortable Stay in Guwahati, Assam',
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.ico', shortcut: '/icon.ico' },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={process.env.NEXT_PUBLIC_THEME_DIR === 'rtl' ? 'ar' : 'en'}
      dir={process.env.NEXT_PUBLIC_THEME_DIR}
      suppressHydrationWarning
      className={cn(clsx(googleSansFlex.variable, playfair_display.variable), 'font-sans')}
    >
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <DirectionProvider direction={process.env.NEXT_PUBLIC_THEME_DIR} dir={process.env.NEXT_PUBLIC_THEME_DIR}>
            <div>{children}</div>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
