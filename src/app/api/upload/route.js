// src/app/api/upload/route.js
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import clientPromise from '../../../utils/mongodb';
import { google } from 'googleapis';

const youtube = google.youtube('v3');

export async function POST(req) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const tags = formData.get('tags').split(',').map(tag => tag.trim());

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ userId: userId });

    if (!user || !user.youtubePlaylistId) {
      console.error('Error uploading video:', 'User or playlist not found');
      return NextResponse.json({ error: 'User or playlist not found' }, { status: 404 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/youtube.upload'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

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
      console.error('Error uploading video:', res.data.error);
      return NextResponse.json({ error: 'An error occurred during video upload' }, { status: 500 });
    }

    const playlistItemRes = await youtube.playlistItems.insert({
      part: 'snippet',
      requestBody: {
        snippet: {
          playlistId: user.youtubePlaylistId,
          resourceId: {
            kind: 'youtube#video',
            videoId: res.data.id,
          },
        },
      },
    });

    if (playlistItemRes.status !== 200) {
      console.error('Error adding video to playlist:', playlistItemRes.data.error);
      return NextResponse.json({ error: 'An error occurred during video upload' }, { status: 500 });
    }

    return NextResponse.json({ success: true, videoId: res.data.id });
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ error: 'An error occurred during video upload' }, { status: 500 });
  }
}
