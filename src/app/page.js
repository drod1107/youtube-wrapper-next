// src/app/page.js

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import VideoGallery from '../components/VideoGallery';

export default function Home() {
  const { isSignedIn, user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      fetchVideos();
    }
  }, [isSignedIn]);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to load videos. Please try again later.');
    }
  };

  if (!isSignedIn) {
    return <div>Please sign in to view videos.</div>;
  }

  if (error) {
    return <div className="my-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="my-4 text-3xl font-bold">Welcome to WGISTL Video Platform</h1>
      <VideoGallery videos={videos} />
    </div>
  );
}
