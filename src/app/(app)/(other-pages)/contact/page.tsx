import ButtonPrimary from '@/components/button-primary'
import { Heading } from '@/components/heading'
import NewsletterSection from '@/components/newsletter-section-1'
import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/site-config'
import ContactForm from './contact-form'

const info = [
  {
    title: 'ADDRESS',
    description:
      'House No. 3, Jana Path, Bye Lane 17, F.A. Ahmed Nagar, Panjabari Road, Six Mile, Guwahati, Assam 781022',
  },
]

const googleMapsUrl = 'https://maps.app.goo.gl/sPNUnzCjtkEtrJ7x6'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Lovely Homestay | Guwahati, Assam',
  description:
    'Contact Lovely Homestay in Guwahati to ask about accommodation availability near Six Mile and VIP Road/Panjabari Road.',
  path: '/contact',
})

const PageContact = () => {
  return (
    <div className="pt-10 pb-24 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="grid shrink-0 grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2">
          <div>
            <Heading level={1} bigger>
              Contact <span data-slot="italic">Us</span>
            </Heading>
            <div className="mt-10 flex max-w-sm flex-col gap-y-8 sm:mt-20">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="text-sm font-medium tracking-wider uppercase dark:text-neutral-200">{item.title}</h3>
                  <span className="mt-2 block text-muted-foreground">{item.description}</span>
                </div>
              ))}
              <ButtonPrimary href={googleMapsUrl} target="_blank" rel="noreferrer">
                Open in Google Maps
              </ButtonPrimary>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container mt-20 lg:mt-32">
        <NewsletterSection
          heading={
            <>
              Discover stays, stories & places <span data-slot="italic">worth visiting.</span>
            </>
          }
          note="Get occasional updates and local travel inspiration from Lovely Homestay."
        />
      </div>
    </div>
  )
}

export default PageContact
