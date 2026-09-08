import {
  Beach02FreeIcons,
  Beach02Icon,
  BoatIcon,
  HotAirBalloonFreeIcons,
  House01Icon,
  House04Icon,
  SpaceshipIcon,
  ZeppelinFreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { Heading } from './heading'
import { Link } from './link'

interface Props {
  className?: string
  heading?: ReactNode
  items?: { title: string; href: string }[]
}

const DEMO_DATA = [
  {
    id: '1',
    icon: Beach02FreeIcons,
    title: 'Beachfront rentals',
    href: '/stay-categories/santo-domingo',
  },
  {
    id: '2',
    icon: BoatIcon,
    title: 'Condo rentals',
    href: '/stay-categories/santo-domingo',
  },
  {
    id: '3',
    icon: SpaceshipIcon,
    title: 'Pet-friendly rentals',
    href: '/stay-categories/santo-domingo',
  },
  {
    id: '4',
    icon: House04Icon,
    title: 'House rentals',
    href: '/stay-categories/santo-domingo',
  },
  {
    id: '5',
    icon: HotAirBalloonFreeIcons,
    title: 'Villa rentals',
    href: '/stay-categories/santo-domingo',
  },
  {
    id: '6',
    icon: ZeppelinFreeIcons,
    title: 'Unique stays',
    href: '/stay-categories/santo-domingo',
  },
  {
    id: '7',
    icon: Beach02Icon,
    title: 'Vacation rentals',
    href: '/stay-categories/santo-domingo',
  },
  {
    id: '8',
    icon: House01Icon,
    title: 'Apartment rentals',
    href: '/stay-categories/santo-domingo',
  },
]

export default function InspirationFutureGetawaysSection({
  className,
  heading = (
    <>
      Inspiration for <span data-slot="italic">future</span> getaways
    </>
  ),
  items,
}: Props) {
  const displayedItems = items?.length
    ? DEMO_DATA.map((item, index) => ({ ...item, ...items[index % items.length] }))
    : DEMO_DATA

  return (
    <div className={clsx('', className)}>
      {heading && <Heading className="mb-11">{heading}</Heading>}
      <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-5">
        <div className="flex rtl:flex-row-reverse">
          {/* Nhóm  thứ 1 */}
          <div className="animate-marquee flex shrink-0 items-center justify-around gap-6 px-3 sm:gap-16 sm:px-8">
            {displayedItems.map((item) => (
              <Link href={item.href} key={item.id} className="flex items-center gap-2.5">
                <div className="flex size-14 shrink-0 -rotate-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <HugeiconsIcon icon={item.icon} className="size-9 rotate-12" />
                </div>
                <h3 className="shrink-0 text-lg font-medium text-foreground">{item.title}</h3>
              </Link>
            ))}
          </div>
          {/* Nhóm  thứ 2 */}
          <div
            className="animate-marquee flex shrink-0 items-center justify-around gap-6 px-3 sm:gap-16 sm:px-8"
            aria-hidden="true"
          >
            {displayedItems.map((item) => (
              <Link href={item.href} key={item.id} className="flex items-center gap-2.5">
                <div className="flex size-14 shrink-0 -rotate-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <HugeiconsIcon icon={item.icon} className="size-9 rotate-12" />
                </div>
                <h3 className="shrink-0 text-lg font-medium text-foreground">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex sm:mt-10 rtl:flex-row-reverse">
          {/* Nhóm  thứ 1 */}
          <div className="animate-marquee-reverse flex shrink-0 items-center justify-around gap-6 px-3 sm:gap-16 sm:px-8">
            {displayedItems.map((item) => (
              <Link href={item.href} key={item.id} className="flex items-center gap-2.5">
                <div className="flex size-14 shrink-0 -rotate-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <HugeiconsIcon icon={item.icon} className="size-9 rotate-12" />
                </div>
                <h3 className="shrink-0 text-lg font-medium text-foreground">{item.title}</h3>
              </Link>
            ))}
          </div>
          {/* Nhóm  thứ 2 */}
          <div
            className="animate-marquee-reverse flex shrink-0 items-center justify-around gap-6 px-3 sm:gap-16 sm:px-8"
            aria-hidden="true"
          >
            {displayedItems.map((item) => (
              <Link href={item.href} key={item.id} className="flex items-center gap-2.5">
                <div className="flex size-14 shrink-0 -rotate-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <HugeiconsIcon icon={item.icon} className="size-9 rotate-12" />
                </div>
                <h3 className="shrink-0 text-lg font-medium text-foreground">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
