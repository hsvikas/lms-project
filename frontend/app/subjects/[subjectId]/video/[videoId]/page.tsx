"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import VideoPlayer from "@/components/VideoPlayer";
import ProgressBar from "@/components/ProgressBar";
import Sidebar from "@/components/Sidebar";

export default function VideoPage() {
  const params = useParams();

  const subjectId = Array.isArray(params.subjectId)
    ? params.subjectId[0]
    : params.subjectId;

  const videoId = Array.isArray(params.videoId)
    ? params.videoId[0]
    : params.videoId;

  const [video, setVideo] = useState<any>(null);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    apiClient.get(`/api/videos/${videoId}`).then((res) => setVideo(res.data));

    apiClient
      .get(`/api/progress/${localStorage.getItem("userId")}`)
      .then((res) => {
        setWatched(
          res.data.some((p: any) => p.video.id === parseInt(videoId))
        );
      });
  }, [videoId]);

  const handleProgress = async () => {
    await apiClient.post(`/api/progress/${videoId}`);
    setWatched(true);
  };

  if (!video)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading video...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <Sidebar
        sections={video?.section?.subject?.sections || []}
        subjectId={subjectId}
      />

      {/* Main Learning Area */}
      <div className="flex-1 p-10">

        {/* Video Title */}
        <h1 className="text-3xl font-bold mb-6 text-green-400">
          {video.title}
        </h1>

        {/* Video Player */}
        <div className="bg-black rounded-xl overflow-hidden shadow-xl mb-6">
          <VideoPlayer url={video.youtubeId} />
        </div>

        {/* Progress */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <ProgressBar watched={watched} onMarkWatched={handleProgress} />
        </div>

        {/* Navigation */}
        <div className="flex gap-4">

          <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
            ← Previous
          </button>

          <button className="bg-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            Next →
          </button>

        </div>
      </div>
    </div>
  );
}