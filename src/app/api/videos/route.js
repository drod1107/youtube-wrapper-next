// src/app/api/videos/route.js

import { getVideos } from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get('playlistId');

  try {
    const videos = await getVideos(playlistId);
    return NextResponse.json({ items: videos });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
