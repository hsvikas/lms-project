"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Sidebar from "@/components/Sidebar";

export default function SubjectPage() {
  const params = useParams();
  const subjectId = Array.isArray(params.subjectId)
    ? params.subjectId[0]
    : params.subjectId;

  const [subject, setSubject] = useState<any>(null);

  useEffect(() => {
    apiClient
      .get(`/api/subjects/${subjectId}`)
      .then((res) => setSubject(res.data));
  }, [subjectId]);

  if (!subject)
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        Loading course...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white">

      {/* Sidebar */}
      <Sidebar sections={subject.sections} subjectId={subjectId} />

      {/* Course Content */}
      <div className="flex-1 p-10">

        {/* Course Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-green-400 mb-3">
            {subject.title}
          </h1>

          <p className="text-gray-300 text-lg">
            {subject.description || "Master this course step by step with guided videos."}
          </p>
        </div>

        {/* What you will learn */}
        <div className="bg-white text-gray-800 rounded-xl p-6 shadow-xl mb-10">

          <h2 className="text-2xl font-bold mb-4">
            What you will learn
          </h2>

          <ul className="space-y-2">
            <li>✔ Understand core concepts clearly</li>
            <li>✔ Build real-world coding skills</li>
            <li>✔ Practice with structured video lessons</li>
            <li>✔ Improve problem-solving ability</li>
          </ul>

        </div>

        {/* Instruction */}
        <div className="text-gray-300 text-lg">
          Select a video from the sidebar to begin learning.
        </div>

      </div>
    </div>
  );
}