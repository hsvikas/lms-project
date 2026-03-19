"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout, isLoggedIn } from "@/lib/auth";

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
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link
          href="/subjects"
          className="text-2xl font-bold flex items-center gap-2"
        >
          💻 SkillNest
        </Link>

        {/* Navigation */}
        <div className="flex gap-6 items-center">

          {loggedIn ? (
            <>
              <Link
                href="/subjects"
                className="text-gray-300 hover:text-blue-600 transition"
              >
                Courses
              </Link>

              <button
                onClick={handleLogout}
                className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}