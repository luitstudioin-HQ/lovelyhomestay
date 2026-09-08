import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import {
  AccelerationIcon,
  BubbleChatQuestionIcon,
  CustomerSupportIcon,
  SecurityCheckIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Button } from './button'
import { Heading } from './heading'
import { Text } from './text'

interface FeatureSection2Props {
  className?: string
  variant?: 'down' | 'up'
  heading?: ReactNode
  faqs?: {
    question: string
    answer: string
  }[]
  imageUrl?: string
  showFacts?: boolean
  factContent?: { title: string; description: string }[]
}

const faqs_demo = [
  {
    question: 'Is my place right for Lovely Homestay?',
    answer:
      'Many travelers choose accommodations near downtown West Palm Beach, in the historic districts, or around Northwood Village for a local experience.',
  },
  {
    question: 'What are Lovely Homestay’s fees?',
    answer:
      'Many travelers choose accommodations near downtown West Palm Beach, in the historic districts, or around Northwood Village for a local experience.',
  },
  {
    question: 'Baggage delay or loss?',
    answer:
      'Many travelers choose accommodations near downtown West Palm Beach, in the historic districts, or around Northwood Village for a local experience.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Many travelers choose accommodations near downtown West Palm Beach, in the historic districts, or around Northwood Village for a local experience.',
  },
]

const facts = [
  {
    id: 1,
    title: 'Security',
    description: 'Your security is our top priority',
    icon: SecurityCheckIcon,
    iconColorClass: 'text-pink-600',
    iconBgColorClass: 'bg-pink-50',
  },
  {
    id: 2,
    title: '24/7 Support',
    description: 'Our support team is available 24/7',
    icon: CustomerSupportIcon,
    iconColorClass: 'text-teal-600',
    iconBgColorClass: 'bg-teal-50',
  },
  {
    id: 3,
    title: 'Easy Booking',
    description: 'Booking a stay has never been easier',
    icon: AccelerationIcon,
    iconColorClass: 'text-orange-600',
    iconBgColorClass: 'bg-orange-50',
  },
]

const FeatureSection2 = ({
  className,
  variant = 'down',
  heading = (
    <>
      Frequently asked <span data-slot="italic">questions</span>
    </>
  ),
  faqs = faqs_demo,
  imageUrl = 'https://images.pexels.com/photos/31776028/pexels-photo-31776028.jpeg',
  showFacts = true,
  factContent,
}: FeatureSection2Props) => {
  const displayedFacts = facts.map((fact, index) => ({ ...fact, ...factContent?.[index] }))

  return (
    <div className={clsx('flex flex-col justify-between gap-8 lg:flex-row', className)}>
      <div className="relative aspect-3/4 flex-1/2 overflow-hidden rounded-b-xl 2xl:flex-3/7">
        <Image
          src={imageUrl}
          fill
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          className="z-0 rounded-t-full"
        />

        {showFacts && <div className="absolute inset-x-4 bottom-4 flex flex-col items-center gap-2 sm:bottom-8 sm:gap-5">
          {displayedFacts.map((fact) => (
            <div key={fact.id} className="flex items-center gap-2 rounded-xl bg-white p-2 sm:gap-2.5 sm:p-4">
              <div className={`${fact.iconBgColorClass} rounded-lg p-2.5`}>
                <HugeiconsIcon icon={fact.icon} className={`size-7 ${fact.iconColorClass}`} />
              </div>
              <div>
                <Text className="text-sm font-medium text-neutral-900">{fact.title}</Text>
                <Text className="text-sm text-neutral-500">{fact.description}</Text>
              </div>
            </div>
          ))}
        </div>}
      </div>

      <div className="relative flex flex-1/2 lg:justify-center 2xl:flex-4/7">
        <div className={clsx('w-full max-w-md', variant === 'up' && 'self-end', variant === 'down' && 'self-start')}>
          {heading && <Heading className="mb-8 sm:mb-14">{heading}</Heading>}

          <dl className="divide-y divide-zinc-900/10">
            {faqs.map((faq, index) => (
              <Disclosure defaultOpen={index === 0} key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <DisclosureButton className="group flex w-full justify-between text-start transition-colors duration-200 hover:text-primary">
                    <Text className="font-medium">{faq.question}</Text>
                    <span className="relative ms-6 size-4 shrink-0 self-center text-zinc-600 dark:text-zinc-400">
                      <PlusIcon
                        aria-hidden="true"
                        className="absolute inset-0 size-4 transition-all duration-300 group-data-open:rotate-90 group-data-open:opacity-0"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="absolute inset-0 size-4 -rotate-90 opacity-0 transition-all duration-300 group-data-open:rotate-0 group-data-open:opacity-100"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel
                  transition
                  as="dd"
                  className="mt-3 origin-top overflow-hidden transition duration-300 ease-out data-closed:-translate-y-2 data-closed:opacity-0"
                >
                  <Text className="max-w-sm text-zinc-600 dark:text-zinc-400">{faq.answer}</Text>
                </DisclosurePanel>
              </Disclosure>
            ))}
            <dt className="mt-8 flex flex-wrap gap-3 sm:mt-12">
              <Button href="/contact">
                <HugeiconsIcon icon={BubbleChatQuestionIcon} className="size-5" />
                Get contact support
              </Button>
            </dt>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection2
