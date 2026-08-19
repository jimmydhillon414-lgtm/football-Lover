'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export function LoginComponent() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/

    const isEmail = emailRegex.test(identifier)
    const isPhone = phoneRegex.test(identifier)

    if (!isEmail && !isPhone) {
      setMessage({ text: 'Please enter a valid email or 10-digit mobile number.', type: 'error' })
      return
    }

    if (password.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters long.', type: 'error' })
      return
    }

    if (password !== confirmPassword) {
      setMessage({ text: 'Password and confirm password do not match.', type: 'error' })
      return
    }

    setLoading(true)

    try {
      let error

      if (isEmail) {
        const res = await supabase.auth.signUp({
          email: identifier,
          password: password,
        })
        error = res.error
      } else {
        const formattedPhone = identifier.startsWith('+') ? identifier : `+${identifier}`
        const res = await supabase.auth.signUp({
          phone: formattedPhone,
          password: password,
        })
        error = res.error
      }

      if (error) {
        setMessage({ text: error.message, type: 'error' })
      } else {
        setMessage({ text: 'Registration successful! Check your inbox/SMS for verification.', type: 'success' })
        setIdentifier('')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'An unexpected error occurred.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[#060b13]">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-100px] left-[-100px] h-[400px] w-[400px] rounded-full bg-green-500/20 blur-[100px]" />
      <div className="absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[100px]" />

      {/* Reusable Home Button */}
      <Link
        href="/"
        className="absolute top-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500/90 px-4 py-2 font-semibold text-black shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
      >
        <Home className="size-4" />
        <span>Home</span>
      </Link>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Sign Up
        </h2>

        {message && (
          <div className={`mb-4 rounded-xl p-4 text-sm font-medium ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-white/70">
              Email / Mobile Number
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none transition focus:border-green-500"
              required
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-white/70">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none transition focus:border-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 p-3 font-bold text-black transition hover:bg-green-400 disabled:bg-gray-600 cursor-pointer"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/70">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginComponent;
