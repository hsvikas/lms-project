"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import { isLoggedIn } from "@/lib/auth";

export default function HomePage() {

  const [loggedIn,setLoggedIn] = useState(false);
  const [subjects,setSubjects] = useState<any[]>([]);
  const [mounted,setMounted] = useState(false);

  useEffect(()=>{

    setMounted(true);

    const logged = isLoggedIn();
    setLoggedIn(logged);

    if(logged){
      apiClient.get("/api/subjects").then(res=>{
        setSubjects(res.data);
      });
    }

  },[]);

  if(!mounted) return null;

  /* ---------- LANDING PAGE ---------- */

  if(!loggedIn){

    return(

      <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-600 to-yellow-300">

        {/* HERO SECTION */}

        <div className="max-w-7xl mx-auto px-8 py-20 text-center text-white">

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


        {/* FEATURES SECTION */}

        <div className="bg-white py-20">

          <div className="max-w-6xl mx-auto px-8">

            <h2 className="text-4xl font-bold text-center text-blue-600 mb-16">
              Why Learn with SkillNest
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-center">

              <div className="p-8 shadow-md rounded-xl">
                <div className="text-5xl mb-4">🎥</div>
                <h3 className="text-xl font-semibold mb-2">
                  Structured Video Lessons
                </h3>
                <p className="text-gray-600">
                  Step-by-step learning through high quality course videos.
                </p>
              </div>

              <div className="p-8 shadow-md rounded-xl">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">
                  Organized Course Content
                </h3>
                <p className="text-gray-600">
                  Courses divided into sections to help you learn faster.
                </p>
              </div>

              <div className="p-8 shadow-md rounded-xl">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">
                  Practical Learning
                </h3>
                <p className="text-gray-600">
                  Build real skills and prepare for real world projects.
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* CTA SECTION */}

        <div className="bg-blue-600 py-16 text-center text-white">

          <h2 className="text-3xl font-bold mb-6">
            Start your learning journey today
          </h2>

          <Link
            href="/register"
            className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition"
          >
            Join SkillNest
          </Link>

        </div>

      </div>

    )

  }


  /* ---------- DASHBOARD ---------- */

  return(

    <div className="min-h-screen pt-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <h1 className="text-4xl font-bold text-blue-600 mb-12">
          Explore Courses
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {subjects.map((subject:any)=>{

            const totalVideos =
              subject.sections?.reduce(
                (acc:number,section:any)=>
                  acc+(section.videos?.length||0),0
              )||0;

            return(

              <Link key={subject.id} href={`/subjects/${subject.id}`}>

                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden">

                  <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-4xl">
                    📚
                  </div>

                  <div className="p-6 flex flex-col flex-grow">

                    <h2 className="text-xl font-bold text-blue-600 mb-2">
                      {subject.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      Structured lessons and practical learning.
                    </p>

                    <div className="text-sm text-gray-500 mb-4">
                      📖 {totalVideos} lessons
                    </div>

                    <button className="bg-yellow-400 text-blue-900 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                      Start Learning →
                    </button>

                  </div>

                </div>

              </Link>

            )

          })}

        </div>

      </div>

    </div>

  )

}