'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import {
  CATEGORIES,
  type GroundType,
  type Position,
  products,
} from '@/lib/products'

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 499 },
  { label: '₹500 – ₹999', min: 500, max: 999 },
  { label: '₹1,000 – ₹1,999', min: 1000, max: 1999 },
  { label: '₹2,000+', min: 2000, max: Infinity },
]

const GROUNDS: (GroundType | 'All')[] = [
  'All',
  'Artificial Turf',
  'Natural Grass',
]
const POSITIONS: (Position | 'All')[] = [
  'All',
  'Winger',
  'Defender',
  'Keeper',
  'Midfielder',
]

type Chip = { active: boolean; onClick: () => void; children: React.ReactNode }

function Chip({ active, onClick, children }: Chip) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )
}

export function ProductCatalog() {
  const [category, setCategory] = useState<string>('All')
  const [priceIdx, setPriceIdx] = useState(0)
  const [ground, setGround] = useState<GroundType | 'All'>('All')
  const [position, setPosition] = useState<Position | 'All'>('All')
  const [customOnly, setCustomOnly] = useState(false)

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceIdx]
    return products.filter((p) => {
      if (category !== 'All' && p.category !== category) return false
      if (p.price < range.min || p.price > range.max) return false
      if (ground !== 'All' && !p.ground.includes(ground)) return false
      if (position !== 'All' && !p.positions.includes(position)) return false
      if (customOnly && !p.customizable) return false
      return true
    })
  }, [category, priceIdx, ground, position, customOnly])

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-px w-6 bg-primary" />
            The Locker
          </p>
          <h2 className="mt-2 font-display text-4xl italic tracking-tight sm:text-5xl">
            SHOP PITCH-READY GEAR
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {filtered.length} product{filtered.length === 1 ? '' : 's'} · prices
          in ₹ INR
        </p>
      </div>

      {/* category row */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Chip active={category === 'All'} onClick={() => setCategory('All')}>
          All
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
          </Chip>
        ))}
      </div>

      {/* filter grid */}
      <div className="mt-6 rounded-2xl border border-border/70 bg-card/50 p-4 sm:p-5">
        <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <SlidersHorizontal className="size-4" />
          Filters
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <p className="mb-2 text-xs font-semibold text-foreground">
              Price Range
            </p>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((r, i) => (
                <Chip
                  key={r.label}
                  active={priceIdx === i}
                  onClick={() => setPriceIdx(i)}
                >
                  {r.label}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-foreground">
              Ground Type
            </p>
            <div className="flex flex-wrap gap-2">
              {GROUNDS.map((g) => (
                <Chip
                  key={g}
                  active={ground === g}
                  onClick={() => setGround(g)}
                >
                  {g}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-foreground">
              Player Position
            </p>
            <div className="flex flex-wrap gap-2">
              {POSITIONS.map((p) => (
                <Chip
                  key={p}
                  active={position === p}
                  onClick={() => setPosition(p)}
                >
                  {p}
                </Chip>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-border/60 pt-4">
          <Chip active={customOnly} onClick={() => setCustomOnly((v) => !v)}>
            Customizable only
          </Chip>
        </div>
      </div>

      {/* grid */}
      <motion.div
        layout
        className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          No gear matches these filters. Try widening your search.
        </p>
      )}
    </section>
  )
}
