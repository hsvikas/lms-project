"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Link from "next/link";

export default function SubjectPage() {
  const params = useParams();

  const subjectId = Array.isArray(params.subjectId)
    ? params.subjectId[0]
    : params.subjectId;

  const [subject, setSubject] = useState<any>(null);

  useEffect(() => {
    apiClient.get(`/api/subjects/${subjectId}`).then((res) => {
      setSubject(res.data);
    });
  }, [subjectId]);

  if (!subject)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading course...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <div className="max-w-6xl mx-auto px-10 py-12">

        {/* Course Title */}
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          {subject.title}
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-10">
          {subject.description ||
            "Master this course step by step with guided video lessons."}
        </p>

        {/* What you will learn */}
        <div className="bg-gray-800 p-6 rounded-xl mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-300">
            What you will learn
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
            <li>✔ Understand core concepts clearly</li>
            <li>✔ Build real-world coding skills</li>
            <li>✔ Practice with structured video lessons</li>
            <li>✔ Improve problem-solving ability</li>
          </ul>
        </div>

        {/* Course Content */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-green-300">
            Course Content
          </h2>

          {subject.sections.map((section: any) => (
            <div
              key={section.id}
              className="bg-gray-800 rounded-xl p-6 mb-6"
            >
              <h3 className="text-xl font-semibold mb-4">
                {section.title}
              </h3>

              <ul className="space-y-2">

                {section.videos.map((video: any) => (
                  <li key={video.id}>
                    <Link
                      href={`/subjects/${subjectId}/video/${video.id}`}
                      className="block p-3 bg-gray-700 rounded hover:bg-blue-600 transition"
                    >
                      🎬 {video.title}
                    </Link>
                  </li>
                ))}

              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}