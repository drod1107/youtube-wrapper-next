// src/app/api/upload/route.js

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/utils/mongodb';
import User from '@/models/User';
import { getAuthenticatedYouTube } from '@/utils/youtube';

export async function POST(req) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await connectDB();
    const user = await User.findOne({ email: userId });

    if (!user || !user.unlisted_playlist_id) {
      return NextResponse.json({ error: 'User has no unlisted playlist' }, { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const tags = formData.get('tags').split(',').map(tag => tag.trim());

    const youtube = await getAuthenticatedYouTube();

    const fileStream = file.stream();
    const fileSize = file.size;

    const res = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          tags,
        },
        status: {
          privacyStatus: 'unlisted',
        },
      },
      media: {
        body: fileStream,
      },
    });

    if (res.status !== 200) {
      throw new Error(`Failed to upload video: ${res.statusText}`);
    }

    const playlistItemRes = await youtube.playlistItems.insert({
      part: 'snippet',
      requestBody: {
        snippet: {
          playlistId: user.unlisted_playlist_id,
          resourceId: {
            kind: 'youtube#video',
            videoId: res.data.id,
          },
        },
      },
    });

    if (playlistItemRes.status !== 200) {
      throw new Error(`Failed to add video to playlist: ${playlistItemRes.statusText}`);
    }

    return NextResponse.json({ success: true, videoId: res.data.id });
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ error: 'An error occurred during video upload' }, { status: 500 });
  }
}