'use client'

import { motion } from 'framer-motion'
import { MapPin, Quote, Star } from 'lucide-react'

type Review = {
  name: string
  role: string
  city: string
  image: string
  rating: number
  quote: string
}

const REVIEWS: Review[] = [
  {
    name: 'Rohan Fernandes',
    role: 'Winger',
    city: 'Mumbai Turf League',
    image: '/images/player-1.png',
    rating: 5,
    quote:
      'The grip socks are a game-changer on Andheri turf. Zero slipping inside my boots during 5-a-side. Worth every rupee.',
  },
  {
    name: 'Ananya Das',
    role: 'Midfielder',
    city: 'Kolkata Grassroots Academy',
    image: '/images/player-2.png',
    rating: 5,
    quote:
      'Got my custom shin guards with my name and number 8. Fit guarantee is real — they replaced my size for free. Superb service pan-India.',
  },
  {
    name: 'Vishnu Nair',
    role: 'Goalkeeper',
    city: 'Kochi Local League',
    image: '/images/player-3.png',
    rating: 5,
    quote:
      'COD delivery in 3 days to Kochi. The boot bag survives our monsoon turf sessions easily. Proper gear made for the Indian game.',
  },
]

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="border-y border-border/70 bg-card/40"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary">
            <Star className="size-4 fill-current" />
            From The Turf
          </p>
          <h2 className="mt-2 font-display text-4xl italic tracking-tight sm:text-5xl">
            TRUSTED BY LOCAL BALLERS
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real reviews from grassroots, academy and turf league players
            across India.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col rounded-2xl border border-border/70 bg-background/60 p-6"
            >
              <Quote className="size-7 text-primary/30" />
              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="size-4 fill-secondary text-secondary"
                  />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                {r.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <img
                  src={r.image || '/placeholder.svg'}
                  alt={r.name}
                  className="size-11 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{r.name}</p>
                  <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3 text-primary" />
                    {r.role} · {r.city}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
