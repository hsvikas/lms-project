"use client";
import { useState } from 'react';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      router.push('/subjects');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-600 mb-2 text-center">SkillForge</h2>
        <p className="text-center text-gray-500 mb-6">Login to your account</p>
        {error && <div className="text-red-500 mb-4 p-3 bg-red-50 rounded">{error}</div>}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition mb-4">
          Login
        </button>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>{' '}
          <a href="/register" className="text-yellow-500 hover:underline">Register</a>
        </div>
      </form>
    </div>
  );
}