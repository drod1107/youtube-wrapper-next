// src/app/upload/page.js

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from "@clerk/nextjs";
import VideoGallery from '../../components/VideoGallery';
import UploadForm from '../../components/UploadForm';

export default function Upload() {
  const { isLoaded, isSignedIn, user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      fetchPrivateVideos();
    }
  }, [isSignedIn]);

  const fetchPrivateVideos = async () => {
    try {
      const response = await fetch('/api/videos?private=true');
      if (!response.ok) {
        throw new Error('Failed to fetch private videos');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching private videos:', error);
      setError('Failed to load private videos. Please try again later.');
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to upload videos.</div>;
  }

  return (
    <main className="container mx-auto px-4">
      <h1 className="my-4 text-3xl font-bold">Upload Video</h1>
      <UploadForm />
      <h2 className="my-4 text-2xl font-bold">Your Uploaded Videos</h2>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <VideoGallery videos={videos} />
      )}
    </main>
  );
}
