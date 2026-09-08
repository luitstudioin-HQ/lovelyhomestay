import { Button } from '@/components/button'
import Footer3 from '@/components/footer3'
import Header from '@/components/header/header'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import { ArrowLeftIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="container flex flex-1 items-center justify-center py-16 sm:py-24">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-neutral-100 px-6 py-16 text-center dark:bg-neutral-900 sm:px-12 sm:py-24">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-sky-400/15 blur-3xl" />

          <div className="relative">
            <span className="text-8xl font-semibold tracking-tight text-primary/25 sm:text-9xl">404</span>
            <Heading level={1} className="mx-auto mt-4 max-w-2xl">
              This path doesn&apos;t lead to <span data-slot="italic">Lovely Homestay</span>
            </Heading>
            <Text className="mx-auto mt-5 max-w-xl text-lg/8 text-muted-foreground">
              The page may have moved or the address may be incorrect. Let&apos;s take you back to a comfortable place.
            </Text>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button color="dark" href="/">
                <ArrowLeftIcon className="size-4!" />
                Return home
              </Button>
              <Button outline href="/stay">
                <MapPinIcon className="size-4!" />
                Explore the stay
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer3 />
    </div>
  )
}
