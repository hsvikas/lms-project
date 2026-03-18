"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import { isLoggedIn } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [subjects, setSubjects] = useState<any[]>([]);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">

        <div className="max-w-5xl mx-auto text-center px-8">

          <h1 className="text-6xl font-bold text-blue-600 mb-6">
            💻 SkillNest
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Learn programming, data science and modern technology skills through
            structured video courses designed for practical learning.
          </p>

          <div className="flex gap-6 justify-center">

            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Learning
            </Link>

            <Link
              href="/login"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
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
    <div className="min-h-screen bg-gray-50 pt-24">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            Explore Courses
          </h1>

          <p className="text-gray-600">
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

                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col">

                  {/* Thumbnail */}
                  <div className="h-44 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-5xl text-white">
                    📚
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">

                    <h2 className="text-xl font-bold mb-2 text-blue-600">
                      {subject.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      Learn key concepts and practical skills through
                      structured lessons and guided projects.
                    </p>

                    <div className="text-sm text-gray-500 space-y-1 mb-5">
                      <div>⭐ {rating} rating</div>
                      <div>📖 {totalVideos} lessons</div>
                      <div>👥 {studentCount.toLocaleString()} students</div>
                      <div>
                        ⏱ {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                      </div>
                    </div>

                    <button className="bg-yellow-400 text-blue-900 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
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