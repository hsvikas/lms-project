"use client";

export default function VideoPlayer({ url }: { url: string }) {
  return (
    <div className="aspect-video w-full mb-4 rounded-xl overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${url}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
}