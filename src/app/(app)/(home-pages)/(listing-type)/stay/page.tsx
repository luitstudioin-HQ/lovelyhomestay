import SectionGridPosts3 from '@/components/blog/section-grid-post-3'
import { Button } from '@/components/button'
import FeatureSection2 from '@/components/feature-section-2'
import { Heading } from '@/components/heading'
import InspirationFutureGetawaysSection from '@/components/inspiration-future-getaways-section'
import NewsletterSection from '@/components/newsletter-section-1'
import SectionGridCategoryBox from '@/components/section-grid-category-box'
import SectionGridFeaturedListings from '@/components/section-grid-featured-listings'
import SectionGroupCategoriesCarousel from '@/components/section-group-categories-carousel'
import HeroSection3 from '@/components/section-hero-3'
import SectionInterestingInfor from '@/components/section-interesting-infor'
import LogoCloud from '@/components/section-logo-cloud'
import SectionWhyUs from '@/components/section-why-us'
import { getStayCategories } from '@/data/categories'
import { getBlogPosts } from '@/data/data'
import { getStayListings } from '@/data/listings'
import stayHeroImg from '@/images/hero-img-stay.webp'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import { absoluteUrl, createPageMetadata, GOOGLE_MAPS_URL, SITE_DESCRIPTION, SITE_EMAIL } from '@/lib/site-config'
import { getHomepageSections, getVisibleAmenities, getVisibleFAQs, getVisibleGalleryImages, getPublishedRooms } from '@/lib/cms/content'
import {
  createLovelyStayPageData,
  featuredStayOverrides,
  lovelyFaqFacts,
  lovelyInformationPanels,
  lovelyInformationStats,
  lovelyStayFaqs,
  lovelyStayHighlights,
  lovelyStayTypes,
  lovelyWhyUsFacts,
  travelGuideOverrides,
} from './data'

export const metadata: Metadata = createPageMetadata({
  title: 'Lovely Homestay | Comfortable Stay in Guwahati, Assam',
  description: SITE_DESCRIPTION,
  path: '/',
})

const lodgingBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Lovely Homestay',
  description: SITE_DESCRIPTION,
  url: absoluteUrl('/'),
  image: [
    absoluteUrl('/images/lovely-homestay/bedroom-main.webp'),
    absoluteUrl('/images/lovely-homestay/living-dining.webp'),
    absoluteUrl('/images/lovely-homestay/kitchen.webp'),
  ],
  email: SITE_EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'House No. 3, Jana Path, Bye Lane 17, F.A. Ahmed Nagar, Panjabari Road, Six Mile',
    addressLocality: 'Guwahati',
    addressRegion: 'Assam',
    postalCode: '781022',
    addressCountry: 'IN',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Kitchen facilities', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Hot water', value: true },
  ],
  sameAs: [GOOGLE_MAPS_URL],
}

type HomepageSectionContent = {
  heading?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  image?: string
}

function getValidCmsImage(value: unknown) {
  if (typeof value !== 'string') return null
  const image = value.trim()
  if (image.startsWith('/') && !image.startsWith('//')) return image
  try {
    const url = new URL(image)
    return url.protocol === 'https:' || url.protocol === 'http:' ? image : null
  } catch {
    return null
  }
}

async function Page() {
  const cmsSections = await getHomepageSections()
  const [cmsFaqs, cmsGallery, cmsAmenities, cmsRooms] = await Promise.all([getVisibleFAQs(), getVisibleGalleryImages(), getVisibleAmenities(), getPublishedRooms()])
  const getSectionContent = (sectionType: string) => (cmsSections.find((section) => section.section_type === sectionType)?.content ?? {}) as HomepageSectionContent
  const heroContent = getSectionContent('hero')
  const aboutContent = getSectionContent('about')
  const highlightsContent = getSectionContent('highlights')
  const ctaContent = getSectionContent('cta')
  const cmsHeroImage = getValidCmsImage(heroContent.image)
  const galleryImages = cmsGallery.length > 0
    ? cmsGallery.map((image) => ({ src: image.public_url ?? image.storage_path, alt: image.alt_text ?? 'Lovely Homestay gallery image' })).filter((image) => Boolean(image.src))
    : [
        { src: '/images/lovely-homestay/bedroom-main.webp', alt: 'Lovely Homestay main bedroom' },
        { src: '/images/lovely-homestay/sofa-bed.webp', alt: 'Blue sofa bed at Lovely Homestay' },
        { src: '/images/lovely-homestay/kitchen.webp', alt: 'Lovely Homestay kitchen' },
        { src: '/images/lovely-homestay/living-dining.webp', alt: 'Lovely Homestay living and dining area' },
      ]
  const homepageFaqs = cmsFaqs.length > 0 ? cmsFaqs.map(({ question, answer }) => ({ question, answer })) : lovelyStayFaqs
  const amenityFacts = cmsAmenities.length > 0 ? cmsAmenities.map((amenity) => ({ title: amenity.name, description: amenity.description ?? '' })) : lovelyWhyUsFacts
  const baseListings = await getStayListings()
  const cmsFeaturedStays = cmsRooms.filter((room) => room.name && room.featured_image).map((room, index) => ({
    ...baseListings[index % baseListings.length], id: room.id, title: room.name, handle: room.slug, nameLocalized: room.description ?? room.name,
    price: room.price ?? 'Enquire', featuredImage: room.featured_image!, galleryImgs: [room.featured_image!], amenities: [], reviewStart: 0, reviewCount: 0,
  }))
  const baseCategories = await getStayCategories()
  const basePosts = await getBlogPosts()
  const featuredStays = baseListings.slice(0, featuredStayOverrides.length).map((listing, index) => ({
    ...listing,
    ...featuredStayOverrides[index],
  }))
  const { nearby, destinationGroups } = createLovelyStayPageData(baseCategories)
  const travelGuides = basePosts.slice(0, travelGuideOverrides.length).map((post, index) => ({
    ...post,
    ...travelGuideOverrides[index],
  }))

  return (
    <main className="relative section-space-bottom">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessJsonLd).replace(/</g, '\\u003c') }}
      />
      <section className="px-4">
        <HeroSection3
          title={
            <>
              {heroContent.heading ?? 'Feel at home while discovering Guwahati and Assam.'}
            </>
          }
          description={heroContent.description ?? 'Comfortable stays, warm local hospitality and a peaceful base for exploring Northeast India.'}
          heroImg={cmsHeroImage ?? '/images/lovely-homestay/living-dining.webp'}
          desktopHeroImg={cmsHeroImage ?? stayHeroImg.src}
          heroAlt="Living and dining area at Lovely Homestay in Guwahati"
          heroImageClassName="object-top lg:object-center"
          cta={
            <Button color="white" href={heroContent.buttonUrl ?? '/contact'}>
              {heroContent.buttonText ?? 'Check availability'}
              <ArrowRightIcon className="size-4! rtl:rotate-180" />
            </Button>
          }
          showSearchForm={false}
          showSocialProof={false}
        />
      </section>

      <section className="container section-space-smaller pb-0!">
        <LogoCloud labels={lovelyStayHighlights} />
      </section>

      <section className="container section-space">
        <InspirationFutureGetawaysSection
          heading={
            aboutContent.heading ?? <>
              Find the right stay for your <span data-slot="italic">Guwahati visit</span>
            </>
          }
          items={lovelyStayTypes}
        />
      </section>

      <section className="container section-space">
        <SectionGridFeaturedListings
          stayListings={cmsFeaturedStays.length > 0 ? cmsFeaturedStays : featuredStays}
          heading={
            <>
              Featured stays <span data-slot="italic">in Guwahati</span>
            </>
          }
          description="A closer look at Lovely Homestay and the everyday comforts available for your Guwahati visit."
          eyebrow="Comfortable stays in Guwahati"
          ctaHref="/contact"
          ctaLabel="Check availability"
          priceSuffix="for availability"
          showSocialProof={false}
          linkCards={false}
        />
      </section>

      <section className="container section-space">
        <SectionWhyUs
          heading={
            <>
              Why guests choose <span data-slot="italic">Lovely Homestay</span>
            </>
          }
          description="Guests can enjoy a peaceful space, useful everyday amenities and a convenient Guwahati location with direct local assistance."
          factContent={amenityFacts}
          ctaHref="/contact"
          ctaLabel="Contact Lovely Homestay"
          trustMessage="Warm local hospitality in Guwahati"
          galleryImages={galleryImages}
        />
      </section>

      <section className="container section-space">
        <SectionGroupCategoriesCarousel groupCategories={destinationGroups} />
      </section>

      <section className="container section-space">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-5">
          <Heading>
            Explore <span data-slot="italic">Guwahati neighbourhoods</span>
          </Heading>
          <Button color="light" href="/contact">
            Ask about your stay
            <ArrowRightIcon className="size-4! rtl:rotate-180" />
          </Button>
        </div>
        <SectionGridCategoryBox categories={nearby} />
      </section>

      <section className="container section-space">
        <SectionInterestingInfor
          heading={
            highlightsContent.heading ?? <>
              Some interesting things about <span data-slot="italic">Lovely Homestay</span>
            </>
          }
          description={highlightsContent.description ?? 'A comfortable local base in Guwahati, created for guests who want practical amenities, warm hospitality and easy access to Assam.'}
          stats={lovelyInformationStats}
          testimonials={lovelyInformationPanels}
          showReviewSource={false}
        />
      </section>

      <section className="container section-space">
        <FeatureSection2
          variant="up"
          heading={
            <>
              Frequently asked <span data-slot="italic">questions</span>
            </>
          }
          faqs={homepageFaqs}
          imageUrl="https://images.pexels.com/photos/10348767/pexels-photo-10348767.jpeg"
          factContent={lovelyFaqFacts}
        />
      </section>

      <section className="container section-space">
        <SectionGridPosts3
          posts={travelGuides}
          heading={
            <>
              Guwahati & Assam <span data-slot="italic">travel tips</span>
            </>
          }
          showViewAll={false}
          linkPosts={false}
          badgeLabel="Travel guide"
          footerLabel="Travel inspiration"
        />
      </section>

      <section className="container py-12 lg:py-16">
        <NewsletterSection
          heading={
            ctaContent.heading ?? <>
              Discover stays, stories & places <span data-slot="italic">worth visiting.</span>
            </>
          }
          note={ctaContent.description ?? 'Get occasional updates and local travel inspiration from Lovely Homestay.'}
        />
      </section>
    </main>
  )
}

export default Page
