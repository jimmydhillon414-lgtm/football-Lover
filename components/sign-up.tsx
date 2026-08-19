'use client'

import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/components/cart/cart-context'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { LoginComponent } from '@/components/login'
import { SignUp } from '@/components/sign-up'

const NAV = [
  { label: 'Shop', href: '#catalog' },
  { label: 'Custom Lab', href: '#custom-lab' },
  { label: 'Combos', href: '#bundles' },
  { label: 'Reviews', href: '#reviews' },
]

export function SiteHeader() {
  const { count, open } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
          <Link href="/" aria-label="Football Lovers home">
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search />
          </Button>
          <Button 
  variant="ghost" 
  size="sm" 
  aria-label="Login" 
  onClick={() => { setIsLoginOpen(true); setIsSignUpOpen(false); }}
>
  Login
</Button>

<Button 
  variant="ghost" 
  size="sm" 
  aria-label="Sign Up" 
  onClick={() => { setIsSignUpOpen(true); setIsLoginOpen(false); }}
> 
  Sign Up 
</Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Open cart, ${count} items`}
            onClick={open}
            className="relative"
          >
            <ShoppingBag />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
      {isSignUpOpen && <SignUp />}
      {isLoginOpen && <LoginComponent />}

      {mobileOpen && (
        <nav className="border-t border-border/70 bg-background px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-base font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
