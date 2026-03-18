"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout, isLoggedIn } from '@/lib/auth';

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    router.push('/login');
  };

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link href="/" className="text-2xl font-extrabold text-green-600 tracking-tight">SkillForge Learning</Link>
        <div className="flex gap-8 items-center">
          {loggedIn ? (
            <>
              <Link href="/" className="text-lg font-medium text-gray-700 hover:text-green-600 transition">Courses</Link>
              <button onClick={handleLogout} className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-green-900 px-6 py-2 rounded-full font-semibold shadow hover:from-yellow-300 hover:to-yellow-200 transition">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-lg font-medium text-gray-700 hover:text-green-600 transition">Login</Link>
              <Link href="/register" className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}