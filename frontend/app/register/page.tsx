"use client";
import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/api/auth/register", { name, email, password });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-yellow-300 overflow-hidden">

      {/* floating emojis */}
      <div className="absolute text-5xl opacity-20 top-10 left-10">💻</div>
      <div className="absolute text-5xl opacity-20 bottom-10 right-10">📚</div>
      <div className="absolute text-5xl opacity-20 top-1/3 right-20">⚡</div>
      <div className="absolute text-5xl opacity-20 bottom-1/3 left-20">🧠</div>
      <div className="absolute text-5xl opacity-20 top-20 right-1/3">🖥️</div>

      <form
        onSubmit={handleRegister}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md z-10"
      >
        <h2 className="text-4xl font-bold text-blue-600 mb-2 text-center">
          SkillNest
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Create your account to start learning
        </p>

        {error && (
          <div className="text-red-500 mb-4 p-3 bg-red-50 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-gray-800 p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <a
            href="/login"
            className="text-yellow-500 font-semibold hover:underline"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}