"use client";
import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/api/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      router.push("/subjects");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDE IMAGE */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518779578993-ec3579fee39f')"
        }}
      >
        <div className="bg-black/60 flex flex-col justify-center items-center text-center text-white w-full p-10">
          <h1 className="text-5xl font-bold mb-4">SkillNest</h1>
          <p className="text-lg">
            Learn programming, build projects, and grow your career.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50">

        <form
          onSubmit={handleLogin}
          className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-green-600 mb-2 text-center">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Login to continue learning
          </p>

          {error && (
            <div className="text-red-500 mb-4 p-3 bg-red-50 rounded">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{" "}
            <a
              href="/register"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}