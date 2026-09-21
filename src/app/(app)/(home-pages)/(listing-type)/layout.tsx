import { ApplicationLayout } from '@/app/application-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Lovely Homestay',
    default: 'Lovely Homestay | Guwahati, Assam',
  },
  description: 'A comfortable and welcoming homestay near Six Mile and VIP Road/Panjabari Road in Guwahati, Assam.',
  keywords: ['Lovely Homestay', 'Guwahati homestay', 'Assam accommodation', 'Six Mile', 'Panjabari'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ApplicationLayout>{children}</ApplicationLayout>
}
