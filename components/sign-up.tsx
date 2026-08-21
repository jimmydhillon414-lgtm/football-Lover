'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export function SignUp() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
    <div className="w-full max-w-md rounded-2xl border border-white/20 bg-black/15 backdrop-blur-md p-8 shadow-2xl shadow-black/90">
      <h2 className="mb-6 text-center text-3xl font-bold text-white tracking-wide">
        Sign Up
      </h2>

      {message && (
        <div className={`mb-4 rounded-xl p-4 text-sm font-medium backdrop-blur-md ${message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white/80">
            Email / Mobile Number
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/40 backdrop-blur-md p-3 text-white outline-none transition focus:border-green-500 focus:bg-black/60 placeholder-zinc-500"
            required
          />
        </div>

        <div className="mb-4">
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

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-white/80">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/40 backdrop-blur-md p-3 pr-11 text-white outline-none transition focus:border-green-500 focus:bg-black/60 placeholder-zinc-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? (
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
  )
}

export default SignUp
