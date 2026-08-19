'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
    } finale {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1520] p-8 shadow-2xl">
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
  )
}

export default LoginComponent
