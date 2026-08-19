import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if your file is in another folder
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function SignUp() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    const isEmail = emailRegex.test(identifier);
    const isPhone = phoneRegex.test(identifier);

    if (!isEmail && !isPhone) {
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

    setLoading(true);

    try {
      let error;

      if (isEmail) {
        const res = await supabase.auth.signUp({
          email: identifier,
          password: password,
        });
        error = res.error;
      } else {
        const formattedPhone = identifier.startsWith('+') ? identifier : `+${identifier}`;
        const res = await supabase.auth.signUp({
          phone: formattedPhone,
          password: password,
        });
        error = res.error;
      }

      if (error) {
        setMessage({ text: error.message, type: 'error' });
      } else {
        setMessage({ text: 'Registration successful! Check your inbox/SMS for verification.', type: 'success' });
        setIdentifier('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'An unexpected error occurred.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#060b13] relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[100px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] bottom-[-100px] right-[-100px]" />
     
     <div onClick={() => router.push('/')} className="absolute z-50 top-4 right-4 text-white bg-green-500 rounded-full px-4 py-2 transition-all hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.6)] select-none">Home</div> 
      <div className="relative z-10 p-8 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Sign Up
        </h2>

        {message && (
          <div className={`p-4 mb-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
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
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-green-500 transition"
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
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-green-500 transition"
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
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-green-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-black font-bold rounded-xl transition"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
