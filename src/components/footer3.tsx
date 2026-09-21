import Link from 'next/link'

const googleMapsUrl = 'https://maps.app.goo.gl/sPNUnzCjtkEtrJ7x6'

const links = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
]

export default function Footer3() {
  return (
    <footer className="border-t border-border">
      <div className="container py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <Link href="/" className="text-2xl font-medium tracking-tight text-gray-950 dark:text-white">
              Lovely Homestay
            </Link>
            <p className="mt-4 max-w-xs text-sm/6 text-gray-600 dark:text-neutral-400">
              A comfortable, welcoming place to stay while discovering Guwahati and Assam.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm/6 font-medium text-gray-900 dark:text-neutral-300">Quick links</h2>
            <ul className="mt-4 space-y-3">
              {links.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm/6 font-medium text-gray-900 dark:text-neutral-300">Visit us</h2>
            <p className="mt-4 max-w-sm text-sm/6 text-gray-600 dark:text-neutral-400">
              House No. 3, Jana Path, Bye Lane 17, F.A. Ahmed Nagar, Panjabari Road, Six Mile, Guwahati, Assam 781022
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium underline underline-offset-4"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-sm/6 text-gray-600 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} Lovely Homestay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
