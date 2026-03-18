"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import VideoPlayer from "@/components/VideoPlayer";
import ProgressBar from "@/components/ProgressBar";
import CoursePlaylist from "@/components/CoursePlaylist";

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

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        Loading video...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28">

      <div className="max-w-5xl mx-auto p-10">

        {/* Video Title */}
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          {video.title}
        </h1>

        {/* Video Player */}
        <div className="bg-white rounded-xl overflow-hidden shadow border mb-6">
          <VideoPlayer url={video.youtubeId} />
        </div>

        {/* Progress */}
        <div className="bg-white p-4 rounded-lg mb-8 shadow border">
          <ProgressBar watched={watched} onMarkWatched={handleProgress} />
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-10">

          <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
            ← Previous
          </button>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Next →
          </button>

        </div>

        {/* Playlist */}
        <CoursePlaylist
          sections={video.section.subject.sections}
          subjectId={subjectId}
          currentVideoId={videoId}
        />

      </div>

    </div>
  );
}