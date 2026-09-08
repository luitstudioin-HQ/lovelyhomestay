import { ThemeProvider } from '@/components/theme-provider'
import { DirectionProvider } from '@/components/ui/direction'
import { cn } from '@/lib/utils'
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
  title: {
    template: '%s | Lovely Homestay',
    default: 'Lovely Homestay | Guwahati, Assam',
  },
  description: 'A comfortable and welcoming homestay near Panjabari and Six Mile in Guwahati, Assam.',
  keywords: ['Lovely Homestay', 'Guwahati homestay', 'Assam accommodation', 'Six Mile', 'Panjabari'],
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
