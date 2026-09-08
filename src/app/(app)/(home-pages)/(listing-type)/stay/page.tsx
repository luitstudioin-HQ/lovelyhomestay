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
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Lovely Homestay in Guwahati, Assam',
  description:
    'Discover a comfortable homestay in Guwahati and explore Assam with Lovely Homestay near Panjabari and Six Mile.',
}

async function Page() {
  const baseListings = await getStayListings()
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
      <section className="px-4">
        <HeroSection3
          title={
            <>
              Feel at home while discovering <span data-slot="italic">Guwahati and Assam.</span>
            </>
          }
          description="Comfortable stays, warm local hospitality and a peaceful base for exploring Northeast India."
          cta={
            <Button color="white" href="/contact">
              Check availability
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
            <>
              Find the right stay for your <span data-slot="italic">Guwahati visit</span>
            </>
          }
          items={lovelyStayTypes}
        />
      </section>

      <section className="container section-space">
        <SectionGridFeaturedListings
          stayListings={featuredStays}
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
            <>
              Some interesting things about <span data-slot="italic">Lovely Homestay</span>
            </>
          }
          description="A comfortable local base in Guwahati, created for guests who want practical amenities, warm hospitality and easy access to Assam."
          stats={lovelyInformationStats}
          testimonials={lovelyInformationPanels}
          showReviewSource={false}
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
          factContent={lovelyWhyUsFacts}
          ctaHref="/contact"
          ctaLabel="Contact Lovely Homestay"
          trustMessage="Warm local hospitality in Guwahati"
          imageUrl="https://images.pexels.com/photos/6130047/pexels-photo-6130047.jpeg"
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
          faqs={lovelyStayFaqs}
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
            <>
              Discover stays, stories & places <span data-slot="italic">worth visiting.</span>
            </>
          }
          note="Get occasional updates and local travel inspiration from Lovely Homestay."
        />
      </section>
    </main>
  )
}

export default Page
