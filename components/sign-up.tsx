
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export function SignUp() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(identifier) || !phoneRegex.test(identifier)) {
      setMessage({ text: 'Please enter a valid email or 10-digit mobile number.', type: 'error' });
      return;
    }

    if (password.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters long.', type: 'error' });
      return;
    }
if (password !== confirmPassword) {
      setMessage({ text: 'Password and confirm password do not match.', type: 'error' });
      return;
    }

    setMessage({ text: 'Registration successful!', type: 'success' });
    console.log('Signing up with', identifier, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="p-8 border rounded-lg shadow-lg w-full max-w-md bg-card">
        <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">
          Sign Up for Football Lovers
        </h2>
        
        {message && (
          <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-card-foreground">
              Email / Mobile Number
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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

          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
