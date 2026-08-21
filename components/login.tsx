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
    <div className="w-full max-w-md rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-8 shadow-2xl shadow-black/80">
      <h2 className="mb-6 text-center text-3xl font-bold text-white tracking-wide">Login</h2>

      {message && (
        <div className={`mb-4 rounded-xl p-4 text-sm font-medium backdrop-blur-md ${message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white/80">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/40 backdrop-blur-md p-3 text-white outline-none transition focus:border-green-500 focus:bg-black/60 placeholder-zinc-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-white/80">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/40 backdrop-blur-md p-3 pr-11 text-white outline-none transition focus:border-green-500 focus:bg-black/60 placeholder-zinc-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
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

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-500 p-3 font-bold text-black shadow-[0_0_15px_rgba(34,197,94,0.4)] transition hover:bg-green-400 disabled:bg-gray-600 cursor-pointer"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-white/70">
        Don't have an account?{' '}
        <Link href="/signup" className="font-semibold text-green-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default LoginComponent
