"use client";
import Link from 'next/link';

export default function Sidebar({ sections, subjectId }: { sections: any[]; subjectId: string }) {
  return (
    <aside className="w-72 bg-white border-r shadow-lg rounded-r-2xl p-6 h-[80vh] sticky top-20 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-green-700">Course Content</h2>
      {sections.map(section => (
        <div key={section.id} className="mb-6">
          <div className="font-semibold mb-2 text-gray-700">{section.title}</div>
          <ul className="space-y-1">
            {section.videos.map((video: any) => (
              <li key={video.id}>
                <Link
                  href={`/subjects/${subjectId}/video/${video.id}`}
                  className="block px-3 py-2 rounded hover:bg-green-50 hover:text-blue-600 transition"
                >
                  {video.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}