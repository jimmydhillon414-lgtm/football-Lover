'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BadgeCheck, MapPin, Zap, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TRUST = [
  { icon: BadgeCheck, label: '100% Fit Guarantee' },
  { icon: MapPin, label: 'Pan-India Shipping' },
  { icon: Zap, label: 'Instant UPI / COD' },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-turf.png"
          alt="Indian football players in action on a floodlit city turf ground"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        
        {/* Glowing Neon Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center lg:justify-start"
        >
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <div className="relative flex items-center group">
              <Search className="absolute left-4 size-4 text-zinc-400 group-focus-within:text-primary transition-colors pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for grip socks, shin guards, studs..."
                className="w-full pl-11 pr-10 py-3 bg-black/60 backdrop-blur-xl border border-white/15 text-white placeholder-zinc-400 text-sm rounded-full outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_25px_rgba(34,197,94,0.3)] shadow-2xl"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3.5 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-5xl italic leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            ENGINEERED FOR THE{' '}
            <span className="text-primary text-glow-green">INDIAN GAME</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-12 bg-primary px-6 text-base font-bold text-primary-foreground hover:bg-primary/90"
              nativeButton={false}
              render={<a href="#catalog" />}
            >
              Shop Pitch-Ready Gear
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-secondary/60 bg-transparent px-6 text-base font-bold text-secondary hover:bg-secondary/10 hover:text-secondary"
              nativeButton={false}
              render={<a href="#custom-lab" />}
            >
              Customize Your Gear
            </Button>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/90"
              >
                <Icon className="size-4 text-primary" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
