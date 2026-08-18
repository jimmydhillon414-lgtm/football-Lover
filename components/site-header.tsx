'use client'

import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)

  // Ensure portal only renders on the client side
  useEffect(() => {
    setMounted(true)
  }, [])

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
          <a href="/" aria-label="Football Lovers home">
            <Logo />
          </a>
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

          {/* Login Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            aria-label="Login" 
            onClick={() => { setIsLoginOpen(true); setIsSignUpOpen(false); }}
          >
            Login
          </Button>

          {/* Sign Up Button */}
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

      {/* Render SignUp inside React Portal (body) */}
      {mounted && isSignUpOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md overflow-y-auto p-4">
          <button
            onClick={() => setIsSignUpOpen(false)}
            className="fixed top-6 right-6 z-[10000] text-white/80 hover:text-white font-bold text-3xl transition bg-black/40 rounded-full w-10 h-10 flex items-center justify-center"
            aria-label="Close Sign Up"
          >
            ✕
          </button>
          <div className="w-full max-w-md my-auto">
            <SignUp />
          </div>
        </div>,
        document.body
      )}

      {/* Render Login inside React Portal (body) */}
      {mounted && isLoginOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md overflow-y-auto p-4">
          <button
            onClick={() => setIsLoginOpen(false)}
            className="fixed top-6 right-6 z-[10000] text-white/80 hover:text-white font-bold text-3xl transition bg-black/40 rounded-full w-10 h-10 flex items-center justify-center"
            aria-label="Close Login"
          >
            ✕
          </button>
          <div className="w-full max-w-md my-auto">
            <LoginComponent />
          </div>
        </div>,
        document.body
      )}

      {/* Mobile Menu */}
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
