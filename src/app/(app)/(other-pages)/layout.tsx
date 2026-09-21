import { ApplicationLayout } from '@/app/application-layout'
import Header from '@/components/header/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ApplicationLayout header={<Header hasBorderBottom={true} />}>{children}</ApplicationLayout>
}
