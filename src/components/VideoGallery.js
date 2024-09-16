// src/components/VideoGallery.js
import { useEffect, useState } from 'react';

const VideoGallery = ({ playlistId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`/api/videos?playlistId=${playlistId}`);
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [playlistId]);

  return (
    <div>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id}>
            <h3>{video.snippet.title}</h3>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default VideoGallery;
