// src/app/api/onboarding/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongodb';
import User from '@/models/User';
import { createPlaylists } from '@/utils/youtube';

export async function POST(request) {
  try {
    await connectDB();

    const { email, first_name, last_name, org_name, permission } = await request.json();

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user
      user.first_name = first_name;
      user.last_name = last_name;
      user.org_name = org_name;
      user.permission = permission;
    } else {
      // Create new user
      user = new User({
        email,
        first_name,
        last_name,
        org_name,
        permission,
      });
    }

    // Create YouTube playlists
    try {
      const playlists = await createPlaylists(org_name);
      user.public_playlist_id = playlists.publicPlaylistId;
      user.unlisted_playlist_id = playlists.unlistedPlaylistId;
    } catch (youtubeError) {
      console.error('YouTube playlist creation error:', youtubeError);
      // Continue without playlist IDs, but log the error
    }

    await user.save();

    return NextResponse.json({ message: 'Onboarding successful', user }, { status: 200 });
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json({ error: error.message || 'Onboarding failed' }, { status: 500 });
  }
}