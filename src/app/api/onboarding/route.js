// src/app/api/onboarding/route.js
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { updateUserPlaylists } from "@/utils/mongodb"; // Custom function to update user in MongoDB

export async function POST(req) {
  const { userId, playlistIds } = await req.json();

  try {
    // Update user's playlists in the database
    await updateUserPlaylists(userId, playlistIds);
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
