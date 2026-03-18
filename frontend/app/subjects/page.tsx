"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import Link from "next/link";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    apiClient.get("/api/subjects")
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Available Courses
      </h1>

      {subjects.map((subject: any) => (
        <Link key={subject.id} href={`/subjects/${subject.id}`}>
          <div className="border p-4 mb-4 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h2 className="text-xl font-semibold">{subject.title}</h2>
            <p className="text-gray-600">{subject.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}