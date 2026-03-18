"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import { isLoggedIn } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const logged = isLoggedIn();
    setLoggedIn(logged);

    if (logged) {
      apiClient.get("/api/subjects").then((res) => setSubjects(res.data));
    }
  }, []);

  if (!mounted) return null;

  /* -------- LANDING PAGE -------- */

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white flex items-center">
        <div className="max-w-6xl mx-auto px-8 py-20 text-center">

          <h1 className="text-6xl font-bold mb-6">
            💻 SkillNest
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Learn programming, data science and modern tech skills through
            structured video courses and hands-on learning.
          </p>

          <div className="flex gap-6 justify-center">
            <Link
              href="/register"
              className="bg-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              Start Learning
            </Link>

            <Link
              href="/login"
              className="border border-green-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    );
  }

  /* -------- DASHBOARD -------- */

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-green-400 mb-3">
            Explore Courses
          </h1>

          <p className="text-gray-400">
            Master new skills with structured learning paths
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {subjects.map((subject: any) => {

            const totalVideos =
              subject.sections?.reduce(
                (acc: number, section: any) =>
                  acc + (section.videos?.length || 0),
                0
              ) || 0;

            const totalDuration = Math.floor(totalVideos * 45);
            const studentCount = Math.floor(Math.random() * 50000) + 1000;
            const rating = (Math.random() * 1 + 4.5).toFixed(1);

            return (
              <Link key={subject.id} href={`/subjects/${subject.id}`}>

                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col">

                  {/* Thumbnail */}
                  <div className="h-44 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-5xl">
                    📚
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">

                    <h2 className="text-xl font-bold mb-2 text-green-400">
                      {subject.title}
                    </h2>

                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                      Learn key concepts and practical skills through
                      structured lessons and projects.
                    </p>

                    <div className="text-sm text-gray-400 space-y-1 mb-5">
                      <div>⭐ {rating} rating</div>
                      <div>📖 {totalVideos} lessons</div>
                      <div>👥 {studentCount.toLocaleString()} students</div>
                      <div>
                        ⏱ {Math.floor(totalDuration / 60)}h{" "}
                        {totalDuration % 60}m
                      </div>
                    </div>

                    <button className="bg-green-600 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                      Start Learning →
                    </button>

                  </div>
                </div>

              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}