"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '../../../lib/apiClient';
import Sidebar from '../../../components/Sidebar';

export default function SubjectPage() {
  const params = useParams();
  const subjectId = Array.isArray(params.subjectId) ? params.subjectId[0] : params.subjectId;
  const [subject, setSubject] = useState<any>(null);

  useEffect(() => {
    apiClient.get(`/subjects/${subjectId}`).then(res => setSubject(res.data));
  }, [subjectId]);

  if (!subject) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex min-h-[80vh]">
      <Sidebar sections={subject.sections} subjectId={subjectId} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4 text-green-700">{subject.title}</h1>
        <p className="text-gray-600 text-lg">Select a video from the sidebar to start learning.</p>
      </div>
    </div>
  );
}