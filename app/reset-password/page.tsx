'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const router = useRouter()

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setMessage({ text: error.message, type: 'error' })
      } else {
        setMessage({
          text: 'Password updated successfully! Redirecting...',
          type: 'success',
        })
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'An error occurred.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xs p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <h2 className="mb-6 text-center text-3xl font-bold text-white tracking-wide">
          Set New Password
        </h2>

        {message && (
          <div
            className={`mb-4 rounded-xl p-4 text-sm font-medium backdrop-blur-md ${
              message.type === 'success'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/5 p-3 text-white outline-none transition focus:border-green-500 focus:bg-black/30 placeholder-zinc-400"
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 p-3 font-bold text-black shadow-[0_0_15px_rgba(34,197,94,0.4)] transition hover:bg-green-400 disabled:bg-gray-600 cursor-pointer"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
