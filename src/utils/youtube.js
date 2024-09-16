// src/utils/youtube.js
import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export async function createPlaylist(title, privacyStatus) {
  try {
    const response = await youtube.playlists.insert({
      part: 'snippet,status',
      resource: {
        snippet: {
          title,
          description: `Playlist created for ${title}`,
        },
        status: {
          privacyStatus,
        },
      },
    });

    return response.data.id;
  } catch (error) {
    console.error('Error creating YouTube playlist:', error);
    throw new Error('Failed to create YouTube playlist');
  }
}

export async function addVideoToPlaylist(playlistId, videoId) {
  try {
    await youtube.playlistItems.insert({
      part: 'snippet',
      resource: {
        snippet: {
          playlistId,
          resourceId: {
            kind: 'youtube#video',
            videoId,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error adding video to playlist:', error);
    throw new Error('Failed to add video to YouTube playlist');
  }
}

// Ensure this utility is only used in server-side code
