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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black overflow-hidden">

      {/* floating emojis */}
      <div className="absolute text-5xl opacity-20 top-10 left-10">💻</div>
      <div className="absolute text-5xl opacity-20 bottom-10 right-10">📚</div>
      <div className="absolute text-5xl opacity-20 top-1/3 right-20">⚡</div>
      <div className="absolute text-5xl opacity-20 bottom-1/3 left-20">🧠</div>
      <div className="absolute text-5xl opacity-20 top-20 right-1/3">🖥️</div>

      {/* login card */}
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md z-10"
      >
        <h2 className="text-4xl font-bold text-green-600 mb-2 text-center">
          SkillNest
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Learn. Build. Grow.
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
  );
}