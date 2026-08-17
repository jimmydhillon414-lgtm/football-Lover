'use client'

import { motion } from 'framer-motion'
import { Plus, TicketPercent } from 'lucide-react'
import { useCart } from '@/components/cart/cart-context'
import { Button } from '@/components/ui/button'
import { formatINR } from '@/lib/products'

type Bundle = {
  id: string
  name: string
  tagline: string
  items: { label: string; image: string }[]
  price: number
  mrp: number
}

const BUNDLES: Bundle[] = [
  {
    id: 'turf-matchday-combo',
    name: 'Turf Matchday Combo',
    tagline: 'Grip Socks + Sock Tape',
    items: [
      { label: 'Grip Socks', image: '/images/grip-socks.png' },
      { label: 'Sock Tape', image: '/images/sock-tape.png' },
    ],
    price: 699,
    mrp: 848,
  },
  {
    id: 'starter-kit',
    name: 'Grassroots Starter Kit',
    tagline: 'Shin Guards + Grip Socks + Tape',
    items: [
      { label: 'Shin Guards', image: '/images/shin-guards.png' },
      { label: 'Grip Socks', image: '/images/grip-socks.png' },
      { label: 'Sock Tape', image: '/images/sock-tape.png' },
    ],
    price: 1499,
    mrp: 1747,
  },
  {
    id: 'pro-turf-kit',
    name: 'Pro Turf Loadout',
    tagline: 'Studs + Boot Bag + Grip Socks',
    items: [
      { label: 'Studs', image: '/images/studs.png' },
      { label: 'Boot Bag', image: '/images/boot-bag.png' },
      { label: 'Grip Socks', image: '/images/grip-socks.png' },
    ],
    price: 3499,
    mrp: 3897,
  },
]

export function Bundles() {
  const { addItem } = useCart()

  return (
    <section id="bundles" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          <TicketPercent className="size-4" />
          Bundle &amp; Save
        </p>
        <h2 className="mt-2 font-display text-4xl italic tracking-tight sm:text-5xl">
          MATCHDAY COMBOS
        </h2>
        <p className="mt-3 text-muted-foreground">
          Stack your kit and save. Curated combos for turf regulars.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {BUNDLES.map((b, i) => {
          const save = b.mrp - b.price
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card"
            >
              <div className="flex items-center justify-between border-b border-border/60 bg-secondary/10 px-4 py-2.5">
                <span className="font-display text-sm italic uppercase tracking-wide text-secondary">
                  {b.name}
                </span>
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-bold text-secondary-foreground">
                  SAVE {formatINR(save)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 p-5">
                {b.items.map((it, idx) => (
                  <div key={it.label} className="flex items-center gap-2">
                    <div className="size-20 overflow-hidden rounded-xl border border-border bg-muted/30">
                      <img
                        src={it.image || '/placeholder.svg'}
                        alt={it.label}
                        className="size-full object-cover"
                      />
                    </div>
                    {idx < b.items.length - 1 && (
                      <Plus className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-1 flex-col px-5 pb-5">
                <p className="text-sm text-muted-foreground">{b.tagline}</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="font-display text-3xl tracking-tight">
                    {formatINR(b.price)}
                  </span>
                  <span className="mb-1 text-sm text-muted-foreground line-through">
                    {formatINR(b.mrp)}
                  </span>
                </div>
                <Button
                  size="lg"
                  onClick={() =>
                    addItem({
                      id: b.id,
                      name: b.name,
                      price: b.price,
                      image: b.items[0].image,
                      meta: b.tagline,
                    })
                  }
                  className="mt-4 h-11 w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Add Combo to Cart
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
