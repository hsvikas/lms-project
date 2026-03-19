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
    <div>

      <h2 className="text-xl font-bold text-blue-700 mb-4">
        📚 Course Playlist
      </h2>

      {sections.map((section) => (
        <div key={section.id} className="mb-6">

          <h3 className="font-semibold text-gray-900 mb-3">
            {section.title}
          </h3>

          <ul className="space-y-2">

            {section.videos.map((video: any) => {

              const isActive =
                String(video.id) === String(currentVideoId);

              return (
                <li key={video.id}>
                  <Link
                    href={`/subjects/${subjectId}/video/${video.id}`}
                    className={`block px-4 py-3 rounded-lg font-semibold transition ${
                      isActive
                        ? "bg-blue-600 !text-white shadow-lg"
                        : "bg-gray-100 !text-gray-900 hover:bg-blue-100"
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