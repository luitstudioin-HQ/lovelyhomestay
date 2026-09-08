import HeroSection4 from '@/components/section-hero-4'
import SectionListingsCarousel from '@/components/section-listings-carousel'
import { getCarCategories, getCarCategoryByHandle, getStayCategoryByHandle } from '@/data/categories'
import { getCarListings } from '@/data/listings'
import carHeroImg from '@/images/hero-img-car.webp'
import { Car02FreeIcons } from '@hugeicons/core-free-icons'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Optional catch-all: without this it matches /car-categories/a/b/c/... to any
// depth and every one of those renders on demand. Prerender the real handles
// (plus the bare route) and 404 everything else.
export const dynamicParams = false

export async function generateStaticParams() {
  const handles = new Set((await getCarCategories()).map(({ handle }) => handle))
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

  const category = await getCarCategoryByHandle(handle?.[0])
  const listings = await getCarListings()

  if (!category?.id) {
    return redirect('/car')
  }

  return (
    <div className="relative container space-y-20 pb-28 sm:space-y-24">
      <HeroSection4
        heroImg={carHeroImg}
        heading={category.titleRaw}
        subHeading={`Over 80 car rental locations in the ${category.name}`}
        subHeadingIcon={Car02FreeIcons}
        searchFormInitTab="Cars"
      />

      {/* Collection demo */}
      <SectionListingsCarousel
        heading={`Top-rated car rentals <span data-slot="italic">in ${category.name}</span>`}
        headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
        subHeading="Guests agree: these cars are highly rated for quality, cleanliness, and more."
        listings={listings.slice(0, 8)}
        cardType="car"
      />

      {/* Collection demo */}
      <SectionListingsCarousel
        heading={`Car rentals with <span data-slot="italic">Premium class</span>`}
        headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
        listings={listings.reverse().slice(2, 10)}
        cardType="car"
      />

      {/* Collection demo */}
      <SectionListingsCarousel
        heading={`Car rentals with <span data-slot="italic">Compact class</span>`}
        headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
        listings={listings.slice(0, 8)}
        cardType="car"
      />
    </div>
  )
}

export default Page
