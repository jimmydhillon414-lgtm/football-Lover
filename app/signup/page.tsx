'use client'

import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { SignUp } from '@/components/sign-up'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 overflow-y-auto p-4">
      {/* Exact Background Image Setup as Modal */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <img
          src="/images/login-bg.jpg.jpg"
          alt="Football action kick background"
          className="size-full object-cover object-center"
        />
      </div>

      {/* Home Button */}
      <Link
        href="/"
        className="fixed top-6 right-6 z-[10000] flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-black shadow-[0_0_20px_rgba(34,197,94,0.8)] transition-all hover:bg-green-400 cursor-pointer"
        aria-label="Return Home"
      >
        <Home className="size-4" />
        <span>Home</span>
      </Link>

      {/* SignUp Component Wrapper */}
      <div className="w-full max-w-md my-auto relative z-10">
        <SignUp onSwitchToLogin={() => router.push('/login')} />
      </div>
    </div>
  )
}
