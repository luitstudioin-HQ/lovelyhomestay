import { TCategory } from '@/data/categories'
import { TBlogPost } from '@/data/data'
import { lovelyHomestayFeaturedAmenities, TStayListing } from '@/data/listings'

export const googleMapsUrl = 'https://maps.app.goo.gl/sPNUnzCjtkEtrJ7x6'

export const lovelyStayHighlights = [
  'Warm local hospitality',
  'Comfortable rooms',
  'Free Wi-Fi',
  'Free parking',
  'Guwahati, Assam',
]

export const lovelyStayTypes = [
  { title: 'Comfortable rooms', href: '/contact' },
  { title: 'City stays', href: '/contact' },
  { title: 'Family visits', href: '/contact' },
  { title: 'Work-friendly stays', href: '/contact' },
  { title: 'Assam getaways', href: '/contact' },
  { title: 'Local experiences', href: '/contact' },
  { title: 'Short stays', href: '/contact' },
  { title: 'Longer visits', href: '/contact' },
]

export const featuredStayOverrides: Partial<TStayListing>[] = [
  {
    title: 'Lovely Homestay',
    badge: 'Homestay',
    address: 'Six Mile and VIP Road/Panjabari Road, Guwahati',
    nameLocalized: 'A comfortable stay near Six Mile and VIP Road/Panjabari Road',
    price: 'Enquire',
    reviewStart: 0,
    reviewCount: 0,
    featuredImage: 'https://images.pexels.com/photos/6130047/pexels-photo-6130047.jpeg',
    amenities: lovelyHomestayFeaturedAmenities,
  },
]

const destinationDetails = [
  ['Guwahati', 'Gateway to Assam', '/images/destinations/guwahati.webp'],
  ['Shillong', 'Hills', '/images/destinations/shillong.webp'],
  ['Kaziranga', 'Wildlife', '/images/destinations/kaziranga.webp'],
  ['Majuli', 'Culture', '/images/destinations/majuli.webp'],
  ['Sivasagar', 'Heritage', '/images/destinations/sivasagar.webp'],
  ['Tezpur', 'Nature', '/images/destinations/tezpur.webp'],
  ['Manas', 'Wildlife', '/images/destinations/manas.webp'],
  ['Haflong', 'Hills', '/images/destinations/haflong.webp'],
] as const

const nearbyDetails = [
  ['Uzan Bazaar', 'Close to attractions', '/images/neighbourhoods/uzan-bazaar.webp'],
  ['Pan Bazaar', 'Great for city stays', '/images/neighbourhoods/pan-bazaar.webp'],
  ['Zoo Road', 'Popular area', '/images/neighbourhoods/zoo-road.webp'],
  ['Six Mile', 'Near Lovely Homestay', '/images/neighbourhoods/six-mile.webp'],
  ['Beltola', 'Local favourite', '/images/neighbourhoods/beltola.webp'],
  ['Khanapara', 'Convenient location', '/images/neighbourhoods/khanapara.webp'],
  ['Paltan Bazaar', 'Well connected', '/images/neighbourhoods/paltan-bazaar.webp'],
  ['Jalukbari', 'Gateway to the city', '/images/neighbourhoods/jalukbari.webp'],
] as const

export function createLovelyStayPageData(baseCategories: TCategory[]) {
  const destinations = destinationDetails.map(([name, subtitle, thumbnail], index) => ({
    ...baseCategories[index % baseCategories.length],
    id: `lovely-destination://${index + 1}`,
    name,
    titleRaw: `${name}, Assam`,
    subtitle,
    region: name === 'Shillong' ? 'Meghalaya' : 'Assam',
    handle: name.toLowerCase().replaceAll(' ', '-'),
    href: '/contact',
    count: 0,
    thumbnail,
    description: `Discover ${name} from a comfortable base in Northeast India.`,
  }))

  const nearby = nearbyDetails.map(([name, countLabel, thumbnail], index) => ({
    ...baseCategories[index % baseCategories.length],
    id: `lovely-nearby://${index + 1}`,
    name,
    titleRaw: `${name}, Guwahati`,
    subtitle: 'Guwahati',
    region: 'Assam',
    handle: name.toLowerCase().replaceAll(' ', '-'),
    href: googleMapsUrl,
    count: 0,
    countLabel,
    thumbnail,
    description: `${name} is a useful base for exploring Guwahati.`,
  }))

  return {
    destinations,
    nearby,
    destinationGroups: [
      { title: 'Popular', handle: 'popular', icon: '', categories: destinations },
      { title: 'Nature', handle: 'nature', icon: 'MountainIcon', categories: destinations.slice(1) },
      {
        title: 'Culture',
        handle: 'culture',
        icon: 'AccelerationIcon',
        categories: [destinations[0], destinations[3], destinations[4]],
      },
      {
        title: 'Hills',
        handle: 'hills',
        icon: 'MountainIcon',
        categories: [destinations[1], destinations[5], destinations[7]],
      },
      { title: 'Wildlife', handle: 'wildlife', icon: '', categories: [destinations[2], destinations[6]] },
    ],
  }
}

export const lovelyStayFaqs = [
  {
    question: 'Where is Lovely Homestay located?',
    answer:
      'Lovely Homestay is near Six Mile and VIP Road/Panjabari Road in Guwahati, Assam. You can open the exact location from our Google Maps link.',
  },
  {
    question: 'What amenities are available?',
    answer:
      'The stay includes essential comforts such as free Wi-Fi, free parking, kitchen and kitchenette facilities, a refrigerator, hot water, hot water kettle, TV with Fire TV, dedicated workspace, dining table and basic cooking essentials.',
  },
  {
    question: 'How can I check availability?',
    answer:
      'Use the Contact Us page to send your dates and stay requirements. Availability can then be confirmed directly.',
  },
  {
    question: 'Can I find stays near Guwahati attractions?',
    answer:
      'Lovely Homestay is near Six Mile and VIP Road/Panjabari Road. Contact us with the places you plan to visit and we can help with local location context.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellation terms can depend on the dates and booking arrangement. Please confirm the applicable terms directly before booking.',
  },
  {
    question: 'How can I contact the homestay?',
    answer: 'Use the Contact Us page to share your dates, guest details and questions directly with Lovely Homestay.',
  },
]

export const lovelyInformationStats = [
  { value: 'Local', label: 'A welcoming stay rooted in Guwahati' },
  { value: 'Comfort', label: 'Useful essentials for a relaxed visit' },
  { value: 'Assam', label: 'A convenient base for regional journeys' },
  { value: 'Helpful', label: 'Direct assistance when planning your stay' },
]

export const lovelyInformationPanels = [
  {
    name: 'A local welcome',
    job: 'Lovely Homestay',
    quote: 'A calm and comfortable place to return to after discovering Guwahati.',
  },
  {
    name: 'Everyday comfort',
    job: 'What to expect',
    quote: 'Practical amenities make short visits and longer stays feel easy.',
  },
  {
    name: 'Explore Assam',
    job: 'From Guwahati',
    quote: 'Use the city as your starting point for culture, nature and wildlife across the region.',
  },
]

export const lovelyWhyUsFacts = [
  { title: 'Comfortable spaces', description: 'A peaceful setting with everyday essentials' },
  { title: 'Local hospitality', description: 'A warm welcome and direct assistance' },
  { title: 'Convenient location', description: 'Near Six Mile and VIP Road/Panjabari Road in Guwahati' },
]

export const lovelyFaqFacts = [
  { title: 'Direct support', description: 'Contact the homestay for assistance' },
  { title: 'Simple enquiries', description: 'Share your dates and stay requirements' },
  { title: 'Local guidance', description: 'Plan your time in Guwahati and Assam' },
]

export const travelGuideOverrides: Partial<TBlogPost>[] = [
  {
    title: 'A first-time guide to exploring Guwahati',
    excerpt:
      'Start with the riverfront, local markets, temples and the neighbourhoods that shape everyday life in Guwahati.',
    featuredImage: {
      src: 'https://images.pexels.com/photos/17843647/pexels-photo-17843647.jpeg',
      alt: 'Local life in Guwahati',
      width: 3637,
      height: 2432,
    },
    date: 'Guwahati guide',
  },
  {
    title: 'Places to experience around Guwahati',
    excerpt: 'Discover cultural landmarks, river views and easy day trips while staying close to the city.',
    featuredImage: {
      src: 'https://images.pexels.com/photos/15678073/pexels-photo-15678073.jpeg',
      alt: 'Cultural performance in Guwahati',
      width: 3637,
      height: 2432,
    },
    date: 'Local inspiration',
  },
  {
    title: 'Planning a weekend escape to Kaziranga',
    excerpt: 'A practical introduction to combining your Guwahati visit with the landscapes and wildlife of Kaziranga.',
    featuredImage: {
      src: 'https://images.pexels.com/photos/35565937/pexels-photo-35565937.jpeg',
      alt: 'Rhinoceros in Kaziranga National Park',
      width: 3637,
      height: 2432,
    },
    date: 'Assam wildlife',
  },
  {
    title: 'Exploring Assam beyond the city',
    excerpt: 'Tea gardens, heritage, hills and river islands offer many reasons to travel beyond Guwahati.',
    featuredImage: {
      src: 'https://images.pexels.com/photos/10348767/pexels-photo-10348767.jpeg',
      alt: 'Tea garden in Assam',
      width: 3637,
      height: 2432,
    },
    date: 'Assam travel',
  },
]
