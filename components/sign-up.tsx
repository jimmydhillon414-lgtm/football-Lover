
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up with', email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="p-8 border rounded-lg shadow-lg w-full max-w-md bg-card">
        <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">
          Sign Up for Football Lovers
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-card-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-card-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-card-foreground">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
