export type GroundType = 'Artificial Turf' | 'Natural Grass'
export type Position = 'Winger' | 'Defender' | 'Keeper' | 'Midfielder'

export type Product = {
  id: string
  name: string
  category: string
  price: number
  mrp: number
  image: string
  rating: number
  reviews: number
  ground: GroundType[]
  positions: Position[]
  customizable: boolean
  badge?: string
  scarcity?: string
  city?: string
}

export const CATEGORIES = [
  'Anti-Slip Grip Socks',
  'Custom Shin Guards',
  'Turf & Firm-Ground Studs',
  'Premium Match Balls',
  'Boot Bags',
  'Sock Tape',
] as const

export const products: Product[] = [
  {
    id: 'grip-socks',
    name: 'Pro-Grip Anti-Slip Socks',
    category: 'Anti-Slip Grip Socks',
    price: 499,
    mrp: 799,
    image: '/images/grip-socks.png',
    rating: 4.8,
    reviews: 1243,
    ground: ['Artificial Turf', 'Natural Grass'],
    positions: ['Winger', 'Midfielder', 'Defender'],
    customizable: true,
    badge: 'BESTSELLER',
    scarcity: '38 players from Bengaluru bought this today',
    city: 'Bengaluru',
  },
  {
    id: 'shin-guards',
    name: 'Custom Carbon Shin Guards',
    category: 'Custom Shin Guards',
    price: 899,
    mrp: 1299,
    image: '/images/shin-guards.png',
    rating: 4.9,
    reviews: 876,
    ground: ['Artificial Turf', 'Natural Grass'],
    positions: ['Defender', 'Midfielder', 'Winger'],
    customizable: true,
    badge: 'CUSTOMIZABLE',
    scarcity: 'Only 3 left in stock',
    city: 'Mumbai',
  },
  {
    id: 'turf-studs',
    name: 'TurfBlade FG/AG Studs',
    category: 'Turf & Firm-Ground Studs',
    price: 2499,
    mrp: 3499,
    image: '/images/studs.png',
    rating: 4.7,
    reviews: 542,
    ground: ['Artificial Turf'],
    positions: ['Winger', 'Midfielder'],
    customizable: false,
    badge: 'NEW',
    scarcity: 'Only 5 left in stock',
    city: 'Kerala',
  },
  {
    id: 'match-ball',
    name: 'Matchday Pro Ball (Size 5)',
    category: 'Premium Match Balls',
    price: 1299,
    mrp: 1899,
    image: '/images/match-ball.png',
    rating: 4.9,
    reviews: 921,
    ground: ['Natural Grass', 'Artificial Turf'],
    positions: ['Keeper', 'Midfielder', 'Defender', 'Winger'],
    customizable: false,
    scarcity: '54 players from Kolkata bought this today',
    city: 'Kolkata',
  },
  {
    id: 'boot-bag',
    name: 'Matchday Boot Bag',
    category: 'Boot Bags',
    price: 899,
    mrp: 1199,
    image: '/images/boot-bag.png',
    rating: 4.6,
    reviews: 331,
    ground: ['Artificial Turf', 'Natural Grass'],
    positions: ['Keeper', 'Defender', 'Winger', 'Midfielder'],
    customizable: true,
    badge: 'CUSTOMIZABLE',
    city: 'Bengaluru',
  },
  {
    id: 'sock-tape',
    name: 'Grip Sock Tape (Twin Pack)',
    category: 'Sock Tape',
    price: 349,
    mrp: 499,
    image: '/images/sock-tape.png',
    rating: 4.7,
    reviews: 689,
    ground: ['Artificial Turf', 'Natural Grass'],
    positions: ['Winger', 'Midfielder', 'Defender', 'Keeper'],
    customizable: false,
    badge: 'VALUE',
    scarcity: 'Only 4 left in stock',
    city: 'Mumbai',
  },
]

export const formatINR = (value: number) =>
  '₹' + value.toLocaleString('en-IN')
