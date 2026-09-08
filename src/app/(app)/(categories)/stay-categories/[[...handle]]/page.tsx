import HeroSection4 from '@/components/section-hero-4'
import SectionListingsCarousel from '@/components/section-listings-carousel'
import { getStayCategories, getStayCategoryByHandle } from '@/data/categories'
import { getStayListings } from '@/data/listings'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Optional catch-all: without this it matches /stay-categories/a/b/c/... to any
// depth and every one of those renders on demand. Prerender the real handles
// (plus the bare route) and 404 everything else.
export const dynamicParams = false

export async function generateStaticParams() {
  const handles = new Set((await getStayCategories()).map(({ handle }) => handle))
  return [{ handle: [] }, ...[...handles].map((handle) => ({ handle: [handle] }))]
}

export async function generateMetadata({ params }: { params: Promise<{ handle?: string[] }> }): Promise<Metadata> {
  const { handle } = await params
  const category = await getStayCategoryByHandle(handle?.[0])
  if (!category) {
    return {
      title: 'Collection not found',
      description: 'The collection you are looking for does not exist.',
    }
  }
  const { name, description } = category
  return { title: name, description }
}

const Page = async ({ params }: { params: Promise<{ handle?: string[] }> }) => {
  const { handle } = await params

  const category = await getStayCategoryByHandle(handle?.[0])
  const listings = await getStayListings()

  if (!category?.id) {
    return redirect('/stay')
  }

  return (
    <div className="relative container space-y-20 pb-28 sm:space-y-24">
      <HeroSection4 heading={category.titleRaw} subHeading={`${category.count} vacation rentals in ${category.name}`} />

      {/* Collection demo */}
      <SectionListingsCarousel
        heading={`Top-rated house rentals <span data-slot="italic">in ${category.name}</span>`}
        headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
        subHeading="Guests agree: these houses are highly rated for location, cleanliness, and more."
        listings={listings.slice(0, 8)}
        cardType="stay"
      />

      {/* Collection demo */}
      <SectionListingsCarousel
        heading={`House rentals with <span data-slot="italic">free parking</span>`}
        headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
        listings={listings.slice(2, 10)}
        cardType="stay"
      />

      {/* Collection demo */}
      <SectionListingsCarousel
        heading={`House rentals with <span data-slot="italic">a hot tub</span>`}
        headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
        listings={listings.slice(0, 8)}
        cardType="stay"
      />
    </div>
  )
}

export default Page
