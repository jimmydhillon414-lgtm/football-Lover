'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Package, ShoppingBag, LogOut, ArrowLeft, MapPin, Plus, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  
  // Editable profile fields
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [profileMsg, setProfileMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Address fields
  const [addresses, setAddresses] = useState<any[]>([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [addrMsg, setAddrMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Fetch user data and saved addresses
  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
        return
      }
      setUser(user)
      setFullName(user.user_metadata?.full_name || '')
      setPhone(user.phone || user.user_metadata?.phone || '')

      // Fetch addresses from Supabase
      const { data: addrData } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (addrData) setAddresses(addrData)
      setLoading(false)
    }
    loadUserData()
  }, [router])

  // Save personal details
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileMsg(null)

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone: phone }
    })

    if (error) {
      setProfileMsg({ text: error.message, type: 'error' })
    } else {
      setProfileMsg({ text: 'Profile updated successfully!', type: 'success' })
    }
  }

  // Save new address
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddrMsg(null)

    const { data, error } = await supabase
      .from('user_addresses')
      .insert([
        {
          user_id: user.id,
          full_name: fullName || 'Valued Customer',
          phone: phone || '',
          street_address: street,
          city,
          state,
          pincode,
        }
      ])
      .select()

    if (error) {
      setAddrMsg({ text: error.message, type: 'error' })
    } else {
      setAddrMsg({ text: 'Address added successfully!', type: 'success' })
      if (data) setAddresses([data[0], ...addresses])
      setStreet('')
      setCity('')
      setState('')
      setPincode('')
      setShowAddressForm(false)
    }
  }

  // Delete address
  const handleDeleteAddress = async (id: string) => {
    const { error } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', id)

    if (!error) {
      setAddresses(addresses.filter((a) => a.id !== id))
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
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-green-400 hover:underline"
        >
          <ArrowLeft className="size-4" /> Back to Shop
        </Link>

        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-sm text-white/60">Manage your profile, delivery addresses, and orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 font-medium text-red-400 transition hover:bg-red-500/30 cursor-pointer"
          >
            <LogOut className="size-4" /> Logout
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Personal Details */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <User className="size-5 text-green-400" /> Personal Details
            </h2>

            {profileMsg && (
              <div className={`mb-4 rounded-xl p-4 text-sm font-medium ${profileMsg.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {profileMsg.text}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-white/70">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
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
                  placeholder="Enter 10-digit mobile number"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-green-500 p-3 font-bold text-black transition hover:bg-green-400 cursor-pointer"
              >
                Save Details
              </button>
            </form>
          </div>

          {/* Saved Addresses Section */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <MapPin className="size-5 text-green-400" /> Saved Delivery Addresses
              </h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="flex items-center gap-1 rounded-lg bg-green-500/20 px-3 py-1.5 text-xs font-semibold text-green-400 hover:bg-green-500/30 cursor-pointer"
              >
                <Plus className="size-3" /> Add New
              </button>
            </div>

            {addrMsg && (
              <div className={`mb-4 rounded-xl p-3 text-xs font-medium ${addrMsg.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {addrMsg.text}
              </div>
            )}

            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="mb-6 space-y-3 rounded-xl border border-white/10 bg-black/40 p-4">
                <input
                  type="text"
                  placeholder="Street Address / House No."
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white outline-none focus:border-green-500"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white outline-none focus:border-green-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white outline-none focus:border-green-500"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white outline-none focus:border-green-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-500 p-2 text-xs font-bold text-black hover:bg-green-400 cursor-pointer"
                >
                  Save Address
                </button>
              </form>
            )}

            <div className="space-y-3">
              {addresses.length === 0 ? (
                <p className="text-center text-xs text-white/50 py-4">No addresses saved yet.</p>
              ) : (
                addresses.map((addr) => (
                  <div key={addr.id} className="flex items-start justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                    <div>
                      <p className="font-semibold text-white">{addr.street_address}</p>
                      <p className="text-xs text-white/60">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-xs text-white/40 mt-1">Ph: {addr.phone}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      title="Delete Address"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
