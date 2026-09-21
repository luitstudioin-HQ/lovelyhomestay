import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { ArrowRightIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/site-config'

const googleMapsUrl = 'https://maps.app.goo.gl/sPNUnzCjtkEtrJ7x6'

export const metadata: Metadata = createPageMetadata({
  title: 'About Lovely Homestay | Guwahati, Assam',
  description:
    'Learn about Lovely Homestay near Six Mile and Panjabari Road, a comfortable local stay with practical amenities in Guwahati, Assam.',
  path: '/about',
})

const comforts = [
  {
    title: 'Comfortable rooms',
    description: 'A calm, welcoming space where you can settle in and feel at home during your time in Guwahati.',
  },
  {
    title: 'Everyday essentials',
    description: 'Free Wi-Fi, hot water and useful kitchen and kitchenette facilities for an easy stay.',
  },
  {
    title: 'Convenient location',
    description: 'Located near Six Mile and VIP Road/Panjabari Road, with free parking and convenient access to the city.',
  },
]

export default function PageAbout() {
  return (
    <main className="container py-16 sm:py-24 lg:py-32">
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Lovely Homestay · Guwahati
        </p>
        <Heading level={1} bigger>
          A comfortable place that feels <span data-slot="italic">like home</span>
        </Heading>
        <p className="mx-auto mt-7 max-w-2xl text-lg/8 text-muted-foreground">
          Lovely Homestay offers a peaceful and practical stay for guests visiting Guwahati. Our focus is simple:
          provide a clean, comfortable space with the essentials you need and a warm local welcome.
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3 lg:mt-24">
        {comforts.map((item) => (
          <article key={item.title} className="rounded-3xl bg-neutral-100 p-7 dark:bg-neutral-900 sm:p-8">
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-white">{item.title}</h2>
            <p className="mt-3 text-base/7 text-muted-foreground">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-16 flex max-w-5xl flex-col items-center rounded-3xl bg-primary/10 px-6 py-12 text-center lg:mt-24 lg:px-12">
        <MapPinIcon className="size-8 text-primary" />
        <Heading level={2} className="mt-5">
          Find us in <span data-slot="italic">Guwahati</span>
        </Heading>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          House No. 3, Jana Path, Bye Lane 17, F.A. Ahmed Nagar, Panjabari Road, Six Mile, Guwahati, Assam 781022
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button color="dark" href={googleMapsUrl} target="_blank" rel="noreferrer">
            Open in Google Maps
            <ArrowRightIcon className="size-4!" />
          </Button>
          <Button outline href="/contact">
            Contact Us
          </Button>
        </div>
      </section>
    </main>
  )
}
