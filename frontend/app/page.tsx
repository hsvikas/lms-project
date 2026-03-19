"use client";
import Link from "next/link";
import { isLoggedIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {

  const router = useRouter();

  useEffect(()=>{

    if(isLoggedIn()){
      router.push("/subjects");
    }

  },[]);

  return(

    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-600 to-yellow-300">

      <div className="max-w-7xl mx-auto px-8 py-20 text-center text-gray-800">

        <h1 className="text-6xl font-bold mb-6">
          💻 SkillNest
        </h1>

        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Learn programming, data science and modern tech skills through
          structured video courses designed for real-world learning.
        </p>

        <div className="flex justify-center gap-6">

          <Link
            href="/register"
            className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition"
          >
            Start Learning
          </Link>

          <Link
            href="/login"
            className="border border-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </Link>

        </div>

      </div>

      {/* FEATURES */}

      <div className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-8">

          <h2 className="text-4xl font-bold text-center text-blue-600 mb-16">
            Why Learn with SkillNest
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div className="p-8 shadow-md rounded-xl">
              <div className="text-5xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold mb-2">
                Video Learning
              </h3>
              <p className="text-gray-600">
                Learn step by step through structured video lessons.
              </p>
            </div>

            <div className="p-8 shadow-md rounded-xl">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">
                Organized Courses
              </h3>
              <p className="text-gray-600">
                Courses divided into sections for better understanding.
              </p>
            </div>

            <div className="p-8 shadow-md rounded-xl">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">
                Real Skills
              </h3>
              <p className="text-gray-600">
                Build practical knowledge through guided learning.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  )

}