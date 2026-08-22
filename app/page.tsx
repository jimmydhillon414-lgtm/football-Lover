'use client'

import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { SignUp } from '@/components/sign-up'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-black/20 overflow-hidden">
      {/* Background Image (Same as SiteHeader Modal) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <img
          src="/images/login-bg.jpg.jpg"
          alt="Football action kick background"
          className="size-full object-cover object-center"
        />
      </div>

      {/* Working Home Button using Next.js Link */}
      <Link
        href="/"
        className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-black shadow-[0_0_20px_rgba(34,197,94,0.8)] transition-all hover:bg-green-400 cursor-pointer"
        aria-label="Return Home"
      >
        <Home className="size-4" />
        <span>Home</span>
      </Link>

      {/* SignUp Box with Router Navigation to Login */}
      <div className="w-full max-w-md my-auto relative z-10">
        <SignUp onSwitchToLogin={() => router.push('/login')} />
      </div>
    </div>
  )
}
