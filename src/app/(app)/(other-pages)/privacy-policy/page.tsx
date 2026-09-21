import { Heading } from '@/components/heading'
import { createPageMetadata, SITE_ADDRESS, SITE_EMAIL } from '@/lib/site-config'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Privacy Policy | Lovely Homestay',
  description: 'Learn how Lovely Homestay handles information shared through this website and direct accommodation enquiries.',
  path: '/privacy-policy',
})

const sections = [
  {
    title: '1. Introduction',
    content:
      'This Privacy Policy explains how Lovely Homestay handles information when you visit this website or contact us about a stay.',
  },
  {
    title: '2. Information We Collect',
    content:
      'This website does not use an online account, booking, payment or customer database. We receive personal information only when you choose to contact us directly.',
  },
  {
    title: '3. Information You Provide',
    content:
      'Information you provide may include your name, email address, phone number, preferred dates, number of guests and any other details you include in an enquiry.',
  },
  {
    title: '4. Contact Form Information',
    content:
      'The contact form creates an email in your own email application using a mailto link. The website does not send the message through a server or store the form submission. Your email provider and ours process the message under their own privacy terms.',
  },
  {
    title: '5. How We Use Information',
    content:
      'We use enquiry information to respond to you, discuss availability and accommodation needs, provide requested information and keep necessary correspondence about a potential or confirmed stay.',
  },
  {
    title: '6. Cookies and Similar Technologies',
    content:
      'The website does not currently use advertising or analytics cookies. It may use browser storage for essential display preferences such as the site theme. You can manage browser storage through your browser settings.',
  },
  {
    title: '7. Website Analytics',
    content: 'No Google Analytics, Meta Pixel or similar visitor analytics service is currently implemented on this website.',
  },
  {
    title: '8. Third-Party Services',
    content:
      'The website links to external services and displays some externally hosted images. When your browser requests external content or you follow an external link, that provider may receive technical information such as your IP address and browser details under its own privacy policy.',
  },
  {
    title: '9. Google Maps',
    content:
      'Links to Google Maps are provided to help you find Lovely Homestay. Opening a map link takes you to a Google service governed by Google’s own terms and privacy policy.',
  },
  {
    title: '10. Data Security',
    content:
      'We take reasonable care of enquiry correspondence. However, no email or internet transmission can be guaranteed to be completely secure.',
  },
  {
    title: '11. Data Retention',
    content:
      'The website itself does not store contact form submissions. Email correspondence may be retained only for as long as reasonably needed to respond to an enquiry, manage a stay or meet applicable obligations.',
  },
  {
    title: '12. Your Rights',
    content:
      'You may contact us to ask what personal information you have sent to us, request a correction or request deletion where applicable, subject to any information we must retain under law.',
  },
  {
    title: "13. Children's Privacy",
    content:
      'This website is intended for accommodation enquiries and is not directed to children. Children should not send personal information without the involvement of a parent or guardian.',
  },
  {
    title: '14. Changes to This Privacy Policy',
    content:
      'We may update this policy when the website or our information practices change. The current version and its update date will remain available on this page.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="container py-16 sm:py-24 lg:py-32">
      <article className="mx-auto max-w-3xl">
        <p className="mb-5 text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">Lovely Homestay</p>
        <Heading level={1} bigger>
          Privacy <span data-slot="italic">Policy</span>
        </Heading>
        <p className="mt-5 text-sm text-muted-foreground">Last updated: 21 September 2026</p>

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
              Questions or privacy requests can be sent to{' '}
              <a className="underline underline-offset-4" href={`mailto:${SITE_EMAIL}`}>
                {SITE_EMAIL}
              </a>
              . Our public location is {SITE_ADDRESS}.
            </p>
          </section>
        </div>

        <p className="mt-12 border-t border-border pt-8 text-sm/6 text-muted-foreground">
          For questions about a stay, please use the <Link className="underline underline-offset-4" href="/contact">contact page</Link>.
        </p>
      </article>
    </main>
  )
}
