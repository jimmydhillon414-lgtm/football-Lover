'use client'

import { Menu, Search, ShoppingBag, X, Home, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useCart } from '@/components/cart/cart-context'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { LoginComponent } from '@/components/login'
import { SignUp } from '@/components/sign-up'
import { supabase } from '@/lib/supabaseClient'
import SearchModal from '@/components/ui/SearchModal'

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
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setMounted(true)

    // Check active user session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth status changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (isSignUpOpen || isLoginOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isSignUpOpen, isLoginOpen])

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
          <SearchModal />

          {/* Profile icon if user is logged in, else Login & Sign Up */}
          {user ? (
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 font-semibold text-green-400">
                <User className="size-4" />
                <span>Account</span>
              </Button>
            </Link>
          ) : (
            <>
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
            </>
          )}

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

      {/* SignUp Modal with Dynamic AI Background */}
      {mounted && isSignUpOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md overflow-y-auto p-4">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <img
              src="/images/login-bg.jpg.jpg"
              alt="Football action kick background"
              className="size-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/80" />
          </div>

          <button
            onClick={() => setIsSignUpOpen(false)}
            className="fixed top-6 right-6 z-[10000] flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-black shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all hover:bg-green-400 cursor-pointer"
            aria-label="Return Home"
          >
            <Home className="size-4" />
            <span>Home</span>
          </button>
          <div className="w-full max-w-md my-auto relative z-10">
            <SignUp />
          </div>
        </div>,
        document.body
      )}

      {/* Login Modal with Dynamic AI Background */}
      {mounted && isLoginOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md overflow-y-auto p-4">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <img
              src="/images/login-bg.jpg.jpg"
              alt="Football action kick background"
              className="size-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/80" />
          </div>

          <button
            onClick={() => setIsLoginOpen(false)}
            className="fixed top-6 right-6 z-[10000] flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-black shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all hover:bg-green-400 cursor-pointer"
            aria-label="Return Home"
          >
            <Home className="size-4" />
            <span>Home</span>
          </button>
          <div className="w-full max-w-md my-auto relative z-10">
            <LoginComponent onSuccess={() => setIsLoginOpen(false)} />
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
