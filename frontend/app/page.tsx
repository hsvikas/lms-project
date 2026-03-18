"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import Link from 'next/link';
import { isLoggedIn } from '@/lib/auth';

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
      apiClient.get('/subjects').then(res => setSubjects(res.data));
    }
  }, []);

  if (!mounted) return null;

  // Landing page for non-logged-in users
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-8 py-20 text-center">
          <h1 className="text-6xl font-bold text-green-700 mb-4">SkillForge Learning</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Learn skills through structured video courses. Master new abilities at your own pace with our comprehensive learning platform.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
              Start Learning
            </Link>
            <Link href="/login" className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard for logged-in users
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-3">Available Courses</h1>
          <p className="text-gray-600 text-lg">Master new skills with our comprehensive courses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject: any) => {
            const totalVideos = subject.sections?.reduce((acc: number, section: any) => acc + (section.videos?.length || 0), 0) || 0;
            const totalDuration = Math.floor(totalVideos * 45); // Estimate 45 mins per video
            const studentCount = Math.floor(Math.random() * 50000) + 1000;
            const rating = (Math.random() * 1 + 4.5).toFixed(1);
            const difficulty = ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)];

            return (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center overflow-hidden">
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">📚</div>
                      <p className="text-sm font-semibold">{subject.title}</p>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Difficulty and Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold" style={{
                        backgroundColor: difficulty === 'Beginner' ? '#dcfce7' : difficulty === 'Intermediate' ? '#fef3c7' : '#fee2e2',
                        color: difficulty === 'Beginner' ? '#15803d' : difficulty === 'Intermediate' ? '#b45309' : '#b91c1c'
                      }}>
                        {difficulty}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-lg">⭐</span>
                        <span className="font-bold text-gray-800">{rating}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition">
                      {subject.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      Master the fundamentals and advanced concepts through structured video lessons and practical examples.
                    </p>

                    {/* Course Info */}
                    <div className="space-y-2 mb-6 text-sm text-gray-600 border-t pt-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">👨‍🏫</span>
                        <span>Expert Instructors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">📖</span>
                        <span>{subject.sections?.length || 0} Sections • {totalVideos} Lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">👥</span>
                        <span>{studentCount.toLocaleString()} students enrolled</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                      Start Learning
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