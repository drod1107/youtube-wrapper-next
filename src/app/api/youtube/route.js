// src/app/api/youtube/route.js
import { createPlaylist } from '@/utils/youtube';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { title, privacyStatus } = await req.json();

  try {
    const playlistId = await createPlaylist(title, privacyStatus);
    return NextResponse.json({ playlistId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create YouTube playlist' }, { status: 500 });
  }
}
