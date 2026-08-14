import { Banknote, CreditCard, Smartphone } from 'lucide-react'
import { Logo } from '@/components/logo'

const COLUMNS = [
  {
    title: 'Shop',
    links: ['Grip Socks', 'Shin Guards', 'Studs', 'Match Balls', 'Boot Bags'],
  },
  {
    title: 'Support',
    links: ['Track Order', 'Returns & Fit Guarantee', 'Shipping', 'Size Guide', 'Contact'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Turf Community', 'Careers', 'Blog'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              फुटबॉल लवर्स — premium football accessories engineered for Indian
              turf culture. From the maidan to the match.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold">
                <Smartphone className="size-3.5 text-primary" /> UPI
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold">
                <CreditCard className="size-3.5 text-primary" /> Cards
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold">
                <Banknote className="size-3.5 text-primary" /> COD
              </span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm italic uppercase tracking-wide text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#catalog"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Football Lovers. Made in India.</p>
          <p>Free express shipping across India on orders above ₹999.</p>
        </div>
      </div>
    </footer>
  )
}
