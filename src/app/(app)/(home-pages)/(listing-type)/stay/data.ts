import { TCategory } from '@/data/categories'
import { TBlogPost } from '@/data/data'
import { TStayListing } from '@/data/listings'

export const googleMapsUrl = 'https://maps.app.goo.gl/sPNUnzCjtkEtrJ7x6'

export const lovelyStayHighlights = [
  'Warm local hospitality',
  'Comfortable rooms',
  'Free Wi-Fi',
  'Private parking',
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
    address: 'Six Mile, Guwahati',
    nameLocalized: 'A comfortable stay near Panjabari and Six Mile',
    price: 'Enquire',
    reviewStart: 0,
    reviewCount: 0,
    featuredImage: 'https://images.pexels.com/photos/6130047/pexels-photo-6130047.jpeg',
    amenities: [
      { icon: 'Wifi01Icon', text: 'Free Wi-Fi' },
      { icon: 'CarParking01Icon', text: 'Private parking' },
      { icon: 'SlowWindsIcon', text: 'Air conditioning' },
      { icon: 'KitchenUtensilsIcon', text: 'Kitchen' },
    ],
  },
]

const destinationDetails = [
  ['Guwahati', 'Gateway to Assam', 'https://images.pexels.com/photos/17843647/pexels-photo-17843647.jpeg'],
  ['Shillong', 'Hills', 'https://images.pexels.com/photos/10029346/pexels-photo-10029346.jpeg'],
  ['Kaziranga', 'Wildlife', 'https://images.pexels.com/photos/35565937/pexels-photo-35565937.jpeg'],
  ['Majuli', 'Culture', 'https://images.pexels.com/photos/6064824/pexels-photo-6064824.jpeg'],
  ['Sivasagar', 'Heritage', 'https://images.pexels.com/photos/15678073/pexels-photo-15678073.jpeg'],
  ['Tezpur', 'Nature', 'https://images.pexels.com/photos/10348767/pexels-photo-10348767.jpeg'],
  ['Manas', 'Wildlife', 'https://images.pexels.com/photos/30542345/pexels-photo-30542345.jpeg'],
  ['Haflong', 'Hills', 'https://images.pexels.com/photos/10101268/pexels-photo-10101268.jpeg'],
] as const

const nearbyDetails = [
  ['Uzan Bazaar', 'Close to attractions'],
  ['Pan Bazaar', 'Great for city stays'],
  ['Zoo Road', 'Popular area'],
  ['Six Mile', 'Near Lovely Homestay'],
  ['Beltola', 'Local favourite'],
  ['Khanapara', 'Convenient location'],
  ['Paltan Bazaar', 'Well connected'],
  ['Jalukbari', 'Gateway to the city'],
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

  const nearby = nearbyDetails.map(([name, countLabel], index) => ({
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
    thumbnail: destinations[index].thumbnail,
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
      'Lovely Homestay is near Panjabari and Six Mile in Guwahati, Assam. You can open the exact location from our Google Maps link.',
  },
  {
    question: 'What amenities are available?',
    answer:
      'The stay includes useful everyday comforts such as free Wi-Fi, air conditioning, private parking and kitchen facilities.',
  },
  {
    question: 'How can I check availability?',
    answer:
      'Use the Contact Us page to send your dates and stay requirements. Availability can then be confirmed directly.',
  },
  {
    question: 'Can I find stays near Guwahati attractions?',
    answer:
      'Lovely Homestay is near Panjabari and Six Mile. Contact us with the places you plan to visit and we can help with local location context.',
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
  { title: 'Convenient location', description: 'Near Panjabari and Six Mile in Guwahati' },
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
