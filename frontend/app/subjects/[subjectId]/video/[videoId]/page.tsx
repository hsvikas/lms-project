"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import VideoPlayer from '@/components/VideoPlayer';
import ProgressBar from '@/components/ProgressBar';
import Sidebar from '@/components/Sidebar';

export default function VideoPage() {
  const params = useParams();
  const subjectId = Array.isArray(params.subjectId) ? params.subjectId[0] : params.subjectId;
  const videoId = Array.isArray(params.videoId) ? params.videoId[0] : params.videoId;
  const [video, setVideo] = useState<any>(null);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    apiClient.get(`/api/videos/${videoId}`).then(res => setVideo(res.data));
    apiClient.get(`/api/progress/${localStorage.getItem('userId')}`).then(res => {
      setWatched(res.data.some((p: any) => p.video.id === parseInt(videoId)));
    });
  }, [videoId]);

  const handleProgress = async () => {
    await apiClient.post(`/api/progress/${videoId}`);
    setWatched(true);
  };

  if (!video) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex min-h-[80vh]">
      <Sidebar sections={video.section.subject.sections} subjectId={subjectId} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-green-700">{video.title}</h1>
        <VideoPlayer url={video.youtubeId} />
        <ProgressBar watched={watched} onMarkWatched={handleProgress} />
        <div className="flex gap-4 mt-6">
          <button className="bg-yellow-400 text-green-900 px-4 py-2 rounded font-semibold shadow hover:bg-yellow-300 transition">Previous</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition">Next</button>
        </div>
      </div>
    </div>
  );
}