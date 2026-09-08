import { ApplicationLayout } from '@/app/application-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Lovely Homestay',
    default: 'Lovely Homestay | A comfortable stay in Guwahati',
  },
  description: 'Stay comfortably near Panjabari and Six Mile while discovering Guwahati and Assam.',
  keywords: ['Lovely Homestay', 'Guwahati homestay', 'Assam accommodation', 'Six Mile', 'Panjabari'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ApplicationLayout>{children}</ApplicationLayout>
}
