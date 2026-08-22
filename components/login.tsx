'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export function LoginComponent({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage({ text: error.message, type: 'error' })
      } else {
        setMessage({ text: 'Logged in successfully!', type: 'success' })

        setTimeout(() => {
          if (onSuccess) onSuccess()

          router.push('/#catalog')
          const catalogSection = document.getElementById('catalog')
          if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 500)
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'An unexpected error occurred.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200 tracking-wide">
        Login
      </h2>

      {message && (
        <div className={`mb-4 rounded-xl p-4 text-sm font-medium backdrop-blur-md ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-green-400">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/50 p-3.5 text-emerald-100 font-medium outline-none transition-all duration-300 focus:border-green-400 focus:bg-black/70 focus:shadow-[0_0_15px_rgba(74,222,128,0.25)] placeholder-zinc-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-green-400">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/50 p-3.5 pr-11 text-emerald-100 font-medium outline-none transition-all duration-300 focus:border-green-400 focus:bg-black/70 focus:shadow-[0_0_15px_rgba(74,222,128,0.25)] placeholder-zinc-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-green-400 transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-green-400" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="mb-6 text-right">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-green-400 hover:text-green-300 hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 p-3.5 font-bold text-black shadow-[0_0_20px_rgba(34,197,94,0.35)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Don't have an account?{' '}
        <Link href="/signup" className="font-semibold text-green-400 hover:text-green-300 hover:underline transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default LoginComponent
