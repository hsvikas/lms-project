"use client";
import Link from "next/link";

export default function CoursePlaylist({
  sections,
  subjectId,
  currentVideoId,
}: {
  sections: any[];
  subjectId: string;
  currentVideoId: string;
}) {
  return (
    <div className="mt-10 bg-gray-50 rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        📚 Course Playlist
      </h2>

      {sections.map((section) => (
        <div key={section.id} className="mb-6">

          {/* Section Title */}
          <h3 className="font-semibold text-gray-200 mb-3">
            {section.title}
          </h3>

          <ul className="space-y-2">

            {section.videos.map((video: any) => {
              const isCurrent = video.id.toString() === currentVideoId;

              return (
                <li key={video.id}>
                  <Link
                    href={`/subjects/${subjectId}/video/${video.id}`}
                    className={`block px-4 py-2 rounded-lg transition ${
                      isCurrent
                        ? "bg-blue-600 text-gray-800"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    🎬 {video.title}
                  </Link>
                </li>
              );
            })}

          </ul>
        </div>
      ))}
    </div>
  );
}