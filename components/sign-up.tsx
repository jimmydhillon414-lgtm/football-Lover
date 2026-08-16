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

    if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
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
    <div className="flex justify-center items-center h-screen bg-[#060b13] relative overflow-hidden">
      {/* ग्लोइंग बैकग्राउंड इफेक्ट्स */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[100px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 p-8 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Sign Up for Football Lovers
        </h2>
        
        {message && (
          <div className={`p-4 mb-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white/70">
              Email / Mobile Number
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-green-500 transition-colors"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white/70">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-green-500 transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-white/70">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-green-500 transition-colors"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold p-3 rounded-xl transition-all shadow-lg shadow-green-500/20">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
