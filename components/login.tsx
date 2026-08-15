'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export function LoginComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // यहाँ पर ऑथेंटिकेशन लॉजिक जोड़ा जाएगा
    console.log('Logging in with', email, password)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="p-8 border rounded-lg shadow-lg w-full max-w-md bg-card">
        <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">Login to Football Lovers</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-card-foreground" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-card-foreground" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
