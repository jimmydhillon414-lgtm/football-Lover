'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export function LoginComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'An unexpected error occurred.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[#060b13]">
      {/* Background Glows (pointer-events-none prevents click blocking) */}
      <div className="pointer-events-none absolute top-[-100px] left-[-100px] h-[400px] w-[400px] rounded-full bg-green-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[100px]" />

      {/* Home Button with z-[100] and pointer-events-auto */}
      <Link
        href="/"
        className="fixed top-6 right-6 z-[100] pointer-events-auto flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-black shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all hover:bg-green-400 cursor-pointer"
      >
        <Home className="size-4" />
        <span>Home</span>
      </Link>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Login</h2>

        {message && (
          <div className={`mb-4 rounded-xl p-4 text-sm font-medium ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-white/70">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none transition focus:border-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-white/70">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none transition focus:border-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 p-3 font-bold text-black transition hover:bg-green-400 disabled:bg-gray-600 cursor-pointer"
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
    </div>
  )
}

export default LoginComponent
