"use client";

export default function ProgressBar({
  watched,
  onMarkWatched,
}: {
  watched: boolean;
  onMarkWatched: () => void;
}) {
  return (
    <div className="mt-6">

      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-300 font-medium">Lesson Progress</span>

        {watched && (
          <span className="text-blue-600 font-semibold">
            Completed ✓
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
        <div
          className={`h-3 rounded-full transition-all ${
            watched ? "bg-blue-500 w-full" : "bg-yellow-400 w-1/4"
          }`}
        ></div>
      </div>

      {!watched && (
        <button
          onClick={onMarkWatched}
          className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Mark as Watched
        </button>
      )}
    </div>
  );
}