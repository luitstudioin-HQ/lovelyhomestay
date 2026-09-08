import { Divider } from '@/components/divider'
import FlightCard from '@/components/flight-card'
import ListingFilterTabs from '@/components/listing-filter-tabs'
import Pagination from '@/components/pagination'
import HeroSection4 from '@/components/section-hero-4'
import { getFlightCategories, getFlightCategoryByHandle } from '@/data/categories'
import { getFlightFilterOptions } from '@/data/data'
import { getFlightListings } from '@/data/listings'
import flightHeroImg from '@/images/hero-img-flight.webp'
import convertNumbThousand from '@/utils/convert-numb-thousand'
import { Airplane02Icon } from '@hugeicons/core-free-icons'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Optional catch-all: without this it matches /flight-categories/a/b/c/... to any
// depth and every one of those renders on demand. Prerender the real handles
// (plus the bare route) and 404 everything else. Set dedupes 'maldives', which
// appears twice in getFlightCategories().
export const dynamicParams = false

export async function generateStaticParams() {
  const handles = new Set((await getFlightCategories()).map(({ handle }) => handle))
  return [{ handle: [] }, ...[...handles].map((handle) => ({ handle: [handle] }))]
}

export async function generateMetadata({ params }: { params: Promise<{ handle?: string[] }> }): Promise<Metadata> {
  const { handle } = await params
  const category = await getFlightCategoryByHandle(handle?.[0])
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

  const category = await getFlightCategoryByHandle(handle?.[0])
  const listings = await getFlightListings()
  const filterOptions = await getFlightFilterOptions()

  if (!category?.id) {
    return redirect('/flight')
  }

  return (
    <div className="relative container pb-28">
      <HeroSection4
        heroImg={flightHeroImg}
        heading={category.titleRaw}
        subHeading={`Over 80 flights ${category.name}`}
        subHeadingIcon={Airplane02Icon}
        searchFormInitTab="Flights"
      />

      <ListingFilterTabs
        className="mt-20 justify-center"
        filterOptions={filterOptions}
        optionPanelAnchor="bottom start"
      />

      <Divider className="my-8 md:my-12" />
      <h2 id="heading" className="scroll-mt-20 text-lg font-medium">
        Showing {convertNumbThousand(category.count)} results
      </h2>

      <div className="mt-7 grid grid-cols-1 gap-y-8">
        {listings.map((listing) => (
          <FlightCard key={listing.id} data={listing} />
        ))}
      </div>

      <div className="mt-20 flex items-center justify-center">
        <Pagination />
      </div>
    </div>
  )
}

export default Page
