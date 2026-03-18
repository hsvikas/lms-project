"use client";

export default function ProgressBar({ watched, onMarkWatched }: { watched: boolean; onMarkWatched: () => void }) {
  return (
    <div className="mt-4">
      {watched ? (
        <div className="text-green-600 font-bold">Watched</div>
      ) : (
        <button
          className="bg-yellow-400 text-green-900 px-4 py-2 rounded font-semibold shadow hover:bg-yellow-300 transition"
          onClick={onMarkWatched}
        >
          Mark as Watched
        </button>
      )}
    </div>
  );
}