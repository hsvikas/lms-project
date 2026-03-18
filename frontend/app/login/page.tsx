"use client";
import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e:any) => {
    e.preventDefault();

    try{
      const res = await apiClient.post("/api/auth/login",{email,password});

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("userId",res.data.user.id);

      router.push("/subjects");

    }catch(err:any){
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-yellow-300">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >

        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-2">
          SkillNest
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Learn. Build. Grow.
        </p>

        {error && (
          <div className="text-red-500 mb-4 text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-blue-900 p-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Login
        </button>

        {/* Register link */}
        <div className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold">
            Register
          </a>
        </div>

      </form>

    </div>
  );
}