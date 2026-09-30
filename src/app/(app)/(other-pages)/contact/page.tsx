import ButtonPrimary from '@/components/button-primary'
import { Heading } from '@/components/heading'
import NewsletterSection from '@/components/newsletter-section-1'
import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/site-config'
import ContactForm from './contact-form'
import { getSiteSettings } from '@/lib/cms/settings'

const info = [
  {
    title: 'ADDRESS',
    description:
      'House No. 3, Jana Path, Bye Lane 17, F.A. Ahmed Nagar, Panjabari Road, Six Mile, Guwahati, Assam 781022',
  },
]

const googleMapsUrl = 'https://maps.app.goo.gl/sPNUnzCjtkEtrJ7x6'

function safeExternalUrl(value: string | null | undefined) {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
  } catch {
    return null
  }
}

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Lovely Homestay | Guwahati, Assam',
  description:
    'Contact Lovely Homestay in Guwahati to ask about accommodation availability near Six Mile and VIP Road/Panjabari Road.',
  path: '/contact',
})

const PageContact = async () => {
  const settings = await getSiteSettings()
  const propertyName = settings?.property_name || 'Lovely Homestay'
  const address = settings?.address ?? info[0].description
  const mapsUrl = settings?.google_maps_url ?? googleMapsUrl
  const contactDetails = [
    { title: 'ADDRESS', value: address, href: null },
    { title: 'PHONE', value: settings?.phone, href: settings?.phone ? `tel:${settings.phone.replace(/[^+\d]/g, '')}` : null },
    { title: 'EMAIL', value: settings?.email, href: settings?.email ? `mailto:${settings.email}` : null },
    { title: 'WHATSAPP', value: settings?.whatsapp, href: safeExternalUrl(settings?.whatsapp) },
    { title: 'FACEBOOK', value: settings?.facebook_url, href: safeExternalUrl(settings?.facebook_url) },
    { title: 'INSTAGRAM', value: settings?.instagram_url, href: safeExternalUrl(settings?.instagram_url) },
  ].filter((detail): detail is { title: string; value: string; href: string | null } => Boolean(detail.value))
  return (
    <div className="pt-10 pb-24 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="grid shrink-0 grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2">
          <div>
            <Heading level={1} bigger>
              Contact <span data-slot="italic">Us</span>
            </Heading>
            <div className="mt-10 flex max-w-sm flex-col gap-y-8 sm:mt-20">
              {contactDetails.map((item) => (
                <div key={item.title}>
                  <h3 className="text-sm font-medium tracking-wider uppercase dark:text-neutral-200">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} className="mt-2 block text-muted-foreground hover:text-foreground">
                      {item.value}
                    </a>
                  ) : <span className="mt-2 block text-muted-foreground">{item.value}</span>}
                </div>
              ))}
              <ButtonPrimary href={mapsUrl} target="_blank" rel="noreferrer">
                Open {propertyName} in Google Maps
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
