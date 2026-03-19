"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import Link from "next/link";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    apiClient.get("/api/subjects")
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-yellow-300">

      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Explore Courses on <span className="text-blue-600">SkillNest</span>
      </h1>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {subjects.map((subject: any) => (
          <Link key={subject.id} href={`/subjects/${subject.id}`}>

            <div className="bg-white rounded-xl shadow-xl p-6 cursor-pointer hover:scale-105 transition">

              {/* Course icon */}
              <div className="text-4xl mb-4">
                💻
              </div>

              {/* Course title */}
              <h2 className="text-2xl font-bold text-yellow-600 mb-2">
                {subject.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                {subject.description}
              </p>

              {/* Course info */}
              <div className="text-sm text-gray-500 flex justify-between">
                <span>📚 Course Content</span>
                <span className="text-blue-600 font-semibold">
                  Start Learning →
                </span>
              </div>

            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}