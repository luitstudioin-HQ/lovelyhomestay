import { Heading } from '@/components/heading'
import { createPageMetadata, SITE_ADDRESS, SITE_EMAIL } from '@/lib/site-config'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Terms & Conditions | Lovely Homestay',
  description: 'Read the website terms for Lovely Homestay accommodation information and enquiries in Guwahati, Assam.',
  path: '/terms-and-conditions',
})

const sections = [
  {
    title: '1. Introduction',
    content:
      'These terms apply to your use of the Lovely Homestay website. By using the website, you agree to use it lawfully and in accordance with these terms.',
  },
  {
    title: '2. Use of the Website',
    content:
      'You may use the website to learn about Lovely Homestay and make genuine accommodation enquiries. You must not misuse the website, interfere with its operation or attempt unauthorised access.',
  },
  {
    title: '3. Accommodation Information',
    content:
      'We aim to keep descriptions, photographs and amenity information accurate. Details may change, and you should confirm any feature that is important to your stay before making arrangements.',
  },
  {
    title: '4. Enquiries and Availability',
    content:
      'Sending an enquiry does not reserve accommodation. Dates and availability are confirmed only through direct communication with Lovely Homestay.',
  },
  {
    title: '5. Booking and Reservation Disclaimer',
    content:
      'This website does not process online reservations. A booking exists only after Lovely Homestay has directly confirmed it and any separately communicated booking requirements have been accepted.',
  },
  {
    title: '6. Guest Responsibilities',
    content:
      'Guests are responsible for providing accurate enquiry details, respecting the property and other people, using facilities responsibly and complying with applicable law.',
  },
  {
    title: '7. Property Rules',
    content:
      'Any property-specific rules that apply to a confirmed stay will be communicated directly during the booking process or before arrival. This page does not create rules that have not been communicated to a guest.',
  },
  {
    title: '8. Payments',
    content:
      'The website does not collect or process payments. If payment arrangements apply to a confirmed stay, they will be communicated directly by Lovely Homestay before you agree to them.',
  },
  {
    title: '9. Cancellation',
    content:
      'No cancellation or refund policy is published through this website. Any applicable cancellation terms must be confirmed directly as part of a specific booking arrangement.',
  },
  {
    title: '10. Third-Party Links',
    content:
      'The website may link to services such as Google Maps. We do not control third-party services and are not responsible for their availability, content or privacy practices.',
  },
  {
    title: '11. Intellectual Property',
    content:
      'The Lovely Homestay name, website text, photographs and design elements may not be copied or reused for commercial purposes without permission, except where rights belong to an identified third party.',
  },
  {
    title: '12. Limitation of Liability',
    content:
      'To the extent permitted by applicable law, Lovely Homestay is not responsible for losses caused by reliance on outdated website information, temporary website unavailability or services operated by third parties. Nothing here excludes rights or liabilities that cannot lawfully be excluded.',
  },
  {
    title: '13. Changes to Terms',
    content:
      'We may update these website terms when the website or its services change. The current version and update date will be shown on this page.',
  },
  {
    title: '14. Governing Law and Jurisdiction',
    content:
      'These website terms are governed by the applicable laws of India. Any dispute is subject to the jurisdiction of a court that is competent under applicable law.',
  },
]

export default function TermsAndConditionsPage() {
  return (
    <main className="container py-16 sm:py-24 lg:py-32">
      <article className="mx-auto max-w-3xl">
        <p className="mb-5 text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">Lovely Homestay</p>
        <Heading level={1} bigger>
          Terms &amp; <span data-slot="italic">Conditions</span>
        </Heading>
        <p className="mt-5 text-sm text-muted-foreground">Last updated: 21 September 2026</p>
        <p className="mt-7 rounded-2xl bg-neutral-100 p-5 text-sm/6 text-muted-foreground dark:bg-neutral-900">
          These are terms for using this website. They are not a substitute for the separate terms agreed directly for a confirmed stay and are not represented as legal advice.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-neutral-950 dark:text-white">{section.title}</h2>
              <p className="mt-3 text-base/7 text-muted-foreground">{section.content}</p>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-white">15. Contact Information</h2>
            <p className="mt-3 text-base/7 text-muted-foreground">
              Contact Lovely Homestay at{' '}
              <a className="underline underline-offset-4" href={`mailto:${SITE_EMAIL}`}>
                {SITE_EMAIL}
              </a>
              , or at {SITE_ADDRESS}.
            </p>
          </section>
        </div>

        <p className="mt-12 border-t border-border pt-8 text-sm/6 text-muted-foreground">
          To ask about accommodation, visit the <Link className="underline underline-offset-4" href="/contact">contact page</Link>.
        </p>
      </article>
    </main>
  )
}
