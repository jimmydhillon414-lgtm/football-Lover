'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Package, ShoppingBag, LogOut, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  
  // Editable profile fields
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Fetch logged in user details
  useEffect(() => {
    async function getUserProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
        return
      }
      setUser(user)
      setFullName(user.user_metadata?.full_name || '')
      setPhone(user.phone || user.user_metadata?.phone || '')
      setLoading(false)
    }
    getUserProfile()
  }, [router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone: phone }
    })

    if (error) {
      setMessage({ text: error.message, type: 'error' })
    } else {
      setMessage({ text: 'Profile updated successfully!', type: 'success' })
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#060b13] text-white">
        <p>Loading details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#060b13] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-green-400 hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to Shop
        </Link>

        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-sm text-white/60">Manage your profile, orders, and bucket details</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 font-medium text-red-400 hover:bg-red-500/30 transition cursor-pointer"
          >
            <LogOut className="size-4" /> Logout
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Personal Details Form */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <User className="size-5 text-green-400" /> Personal Details
            </h2>

            {message && (
              <div className={`mb-4 rounded-xl p-4 text-sm font-medium ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-white/70">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-white/70">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 p-3 text-white/50 outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-white/70">Mobile Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-green-500 p-3 font-bold text-black transition hover:bg-green-400 cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Quick Stats & Orders */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Package className="size-5 text-green-400" /> Order History
              </h2>
              <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
                <p className="text-sm text-white/60">No orders placed yet.</p>
                <Link
                  href="/#catalog"
                  className="mt-3 inline-block rounded-lg bg-green-500/20 px-3 py-1.5 text-xs font-semibold text-green-400 hover:bg-green-500/30"
                >
                  Explore Pitch-Ready Gear
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
                <ShoppingBag className="size-5 text-green-400" /> Bucket Details
              </h2>
              <p className="text-xs text-white/60">Your saved items and gear choices will appear here during checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
