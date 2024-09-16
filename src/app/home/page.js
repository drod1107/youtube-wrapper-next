// src/app/home/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import VideoGallery from '@/components/VideoGallery';

const HomePage = () => {
  const { userId } = useAuth();
  const [videos, setVideos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();

        if (!userData.public_playlist_id) {
          // Redirect to onboarding if no public playlist ID is found
          router.push('/onboarding');
        } else {
          // Fetch videos from the public playlist
          const videoResponse = await fetch(`/api/videos?playlistId=${userData.public_playlist_id}`);
          const videoData = await videoResponse.json();
          setVideos(videoData.items || []);
        }
      } catch (error) {
        console.error('Error fetching user data or videos:', error);
      }
    };

    fetchUserPlaylists();
  }, [userId, router]);

  return (
    <div>
      {videos.length > 0 ? (
        <VideoGallery videos={videos} />
      ) : (
        <p>This account does not yet have any finalized assets for sharing. Please contact admin if you believe this is an error.</p>
      )}
    </div>
  );
};

export default HomePage;
