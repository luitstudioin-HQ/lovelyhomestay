'use client'

import { Divider } from '@/components/divider'
import { Link } from '@/components/link'
import SwitchDarkMode2 from '@/components/switch-dark-mode2'
import { Text } from '@/components/text'
import { Disclosure, DisclosureButton, DisclosurePanel, useClose } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {}

const MAIN_NAVIGATION = [
  { label: 'Home', href: '/' },
  { label: 'Stays', href: '/stay' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
] as const

const ASSAM_DESTINATIONS = ['Guwahati', 'Kaziranga', 'Majuli', 'Sivasagar', 'Tezpur', 'Manas', 'Haflong', 'Shillong']

const SidebarNavigation: React.FC<Props> = () => {
  const handleClose = useClose()
  const pathname = usePathname()

  return (
    <div className="pb-[max(1rem,env(safe-area-inset-bottom))]">
      <Text className="text-sm/6 text-muted-foreground">
        Comfortable stays, local hospitality, and memorable journeys across Assam.
      </Text>

      <nav
        aria-label="Lovely Homestay menu"
        className="mt-6 rounded-2xl border border-border bg-background p-2 shadow-sm"
      >
        <ul className="space-y-1">
          {MAIN_NAVIGATION.slice(0, 2).map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors',
                    isActive ? 'bg-accent text-foreground' : 'text-foreground hover:bg-accent/70'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}

          <Disclosure as="li">
            {({ open }) => (
              <>
                <DisclosureButton className="flex min-h-12 w-full cursor-pointer items-center justify-between rounded-xl px-4 text-start text-base font-medium text-foreground transition-colors hover:bg-accent/70">
                  Explore Assam
                  <ChevronDownIcon
                    className={clsx(
                      'size-4 text-muted-foreground transition-transform duration-200',
                      open && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </DisclosureButton>
                <DisclosurePanel
                  transition
                  className="origin-top overflow-hidden transition duration-200 ease-out data-closed:-translate-y-1 data-closed:opacity-0"
                >
                  <ul className="mt-1 grid grid-cols-2 gap-1 border-t border-border px-2 pt-2 pb-1">
                    {ASSAM_DESTINATIONS.map((destination) => (
                      <li key={destination}>
                        <Link
                          href={`/stay-search?location=${encodeURIComponent(destination)}`}
                          onClick={handleClose}
                          className="flex min-h-11 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          {destination}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>

          {MAIN_NAVIGATION.slice(2).map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors',
                    isActive ? 'bg-accent text-foreground' : 'text-foreground hover:bg-accent/70'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-6 rounded-2xl bg-accent p-5">
        <p className="text-base font-medium text-foreground">Planning your stay?</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Ask us about availability and your Guwahati visit.
        </p>
        <Link
          href="/contact"
          onClick={handleClose}
          className="mt-4 inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          Contact Us
        </Link>
      </div>

      <Divider className="mt-6" />

      <div className="flex min-h-16 items-center justify-between gap-4 py-3">
        <div>
          <p className="text-sm font-medium text-foreground">Appearance</p>
          <p className="text-xs text-muted-foreground">Light or dark mode</p>
        </div>
        <SwitchDarkMode2 />
      </div>
    </div>
  )
}

export default SidebarNavigation
