"use client";

export default function ProgressBar({
  watched,
  onMarkWatched,
}: {
  watched: boolean;
  onMarkWatched: () => void;
}) {
  return (
    <div>

      {/* Title */}
      <h3 className="!text-gray-900 font-semibold mb-2">
        Lesson Progress
      </h3>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${
            watched ? "bg-yellow-400 w-full" : "bg-yellow-400 w-1/3"
          }`}
        />
      </div>

      {/* Button */}
      {watched ? (
        <div className="text-green-600 font-bold">
          ✔ Completed
        </div>
      ) : (
        <button
          onClick={onMarkWatched}
          className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
        >
          Mark as Watched
        </button>
      )}
    </div>
  );
}