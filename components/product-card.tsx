'use client'

import { motion } from 'framer-motion'
import { Flame, Plus, Star } from 'lucide-react'
import { useCart } from '@/components/cart/cart-context'
import { Button } from '@/components/ui/button'
import { formatINR, type Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100,
  )

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-muted/40 to-card">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-lg italic leading-tight tracking-tight text-pretty">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-0.5 rounded bg-primary/15 px-1.5 py-0.5 font-bold text-primary">
            <Star className="size-3 fill-current" />
            {product.rating}
          </span>
          <span className="text-muted-foreground">
            ({product.reviews.toLocaleString('en-IN')})
          </span>
        </div>

        {product.scarcity && (
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-secondary">
            <Flame className="size-3.5" />
            {product.scarcity}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="font-display text-2xl leading-none tracking-tight">
              {formatINR(product.price)}
            </p>
            <p className="text-xs text-muted-foreground line-through">
              {formatINR(product.mrp)}
            </p>
          </div>
          <Button
            size="icon-lg"
            aria-label={`Add ${product.name} to cart`}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
          >
            <Plus />
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
