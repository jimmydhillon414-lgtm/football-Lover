'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/cart/cart-context'
import { Button } from '@/components/ui/button'
import { formatINR } from '@/lib/products'

const ITEMS = [
  { id: 'shin-guards', label: 'Shin Guards', price: 899, image: '/images/shin-guards.png' },
  { id: 'grip-socks', label: 'Grip Socks', price: 499, image: '/images/grip-socks.png' },
  { id: 'boot-bag', label: 'Boot Bag', price: 899, image: '/images/boot-bag.png' },
] as const

const ACCENTS = [
  { name: 'Neon Green', value: 'oklch(0.86 0.24 146)' },
  { name: 'Saffron', value: 'oklch(0.79 0.16 66)' },
  { name: 'Electric Blue', value: 'oklch(0.7 0.16 250)' },
  { name: 'Hot Pink', value: 'oklch(0.7 0.2 350)' },
  { name: 'White', value: 'oklch(0.97 0 0)' },
]

const CUSTOM_FEE = 149

export function CustomLab() {
  const { addItem } = useCart()
  const [itemIdx, setItemIdx] = useState(0)
  const [accent, setAccent] = useState(ACCENTS[0].value)
  const [name, setName] = useState('CAPTAIN')
  const [number, setNumber] = useState('10')
  const [added, setAdded] = useState(false)

  const item = ITEMS[itemIdx]
  const total = item.price + CUSTOM_FEE

  const handleAdd = () => {
    addItem({
      id: `custom-${item.id}-${Date.now()}`,
      name: `Custom ${item.label}`,
      price: total,
      image: item.image,
      meta: `${name || '—'} · #${number || '0'}`,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <section
      id="custom-lab"
      className="relative overflow-hidden border-y border-border/70 bg-card/40"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary">
            <Sparkles className="size-4" />
            Custom Lab
          </p>
          <h2 className="mt-2 font-display text-4xl italic tracking-tight sm:text-5xl">
            CUSTOMIZE YOUR GEAR
          </h2>
          <p className="mt-3 text-muted-foreground">
            Print your name &amp; jersey number and pick your accent. Live
            preview updates as you build.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* live preview */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-24">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-muted/40 to-background"
              >
                <img
                  src={item.image || '/placeholder.svg'}
                  alt={item.label}
                  className="absolute inset-0 size-full object-cover opacity-90"
                />
                {/* accent glow ring */}
                <div
                  className="pointer-events-none absolute inset-0 transition-all"
                  style={{
                    boxShadow: `inset 0 0 120px -20px ${accent}`,
                  }}
                />
                {/* name + number plate */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div
                    className="rounded-2xl border p-4 backdrop-blur-md transition-colors"
                    style={{
                      borderColor: accent,
                      background: 'oklch(0.16 0.022 264 / 0.7)',
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="truncate font-display text-2xl italic uppercase tracking-tight transition-colors sm:text-3xl"
                        style={{ color: accent }}
                      >
                        {name || 'YOUR NAME'}
                      </span>
                      <span
                        className="font-display text-4xl leading-none transition-colors sm:text-5xl"
                        style={{ color: accent }}
                      >
                        {number || '0'}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="absolute left-4 top-4 rounded-md bg-background/70 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
                  Live Preview
                </span>
              </motion.div>
            </div>
          </div>

          {/* controls */}
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Choose Product
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ITEMS.map((it, i) => (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => setItemIdx(i)}
                    className={`rounded-xl border p-2 text-center transition-colors ${
                      itemIdx === i
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/40'
                    }`}
                  >
                    <img
                      src={it.image || '/placeholder.svg'}
                      alt={it.label}
                      className="mx-auto mb-1 size-14 rounded-lg object-cover"
                    />
                    <span className="text-xs font-semibold">{it.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cl-name"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Name / Text
                </label>
                <input
                  id="cl-name"
                  value={name}
                  maxLength={12}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder="YOUR NAME"
                  className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm font-semibold outline-none transition-colors focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="cl-number"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Jersey No.
                </label>
                <input
                  id="cl-number"
                  value={number}
                  inputMode="numeric"
                  maxLength={2}
                  onChange={(e) =>
                    setNumber(e.target.value.replace(/\D/g, '').slice(0, 2))
                  }
                  placeholder="10"
                  className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm font-semibold outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Accent Colour
              </label>
              <div className="flex flex-wrap gap-3">
                {ACCENTS.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    aria-label={a.name}
                    onClick={() => setAccent(a.value)}
                    className={`flex size-10 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 ${
                      accent === a.value
                        ? 'border-foreground'
                        : 'border-transparent'
                    }`}
                    style={{ background: a.value }}
                  >
                    {accent === a.value && (
                      <Check className="size-4 text-background" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 rounded-2xl border border-border/70 bg-background/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold">{formatINR(item.price)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Customization</span>
                <span className="font-semibold">{formatINR(CUSTOM_FEE)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                <span className="font-display text-lg italic">TOTAL</span>
                <span className="font-display text-2xl">{formatINR(total)}</span>
              </div>
              <Button
                size="lg"
                onClick={handleAdd}
                className="mt-4 h-12 w-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
              >
                {added ? (
                  <>
                    <Check /> Added to cart
                  </>
                ) : (
                  'Add Custom Gear to Cart'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
