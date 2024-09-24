// pages/api/auth/google/callback.js (for Pages Router)
// or app/api/auth/google/callback/route.js (for App Router)

import { oauth2Client } from '@/utils/youtube';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ userId: tokens.id_token });
    if (user) {
      await db.collection('users').updateOne(
        { userId: tokens.id_token },
        { $set: { tokens } }
      );
    } else {
      await db.collection('users').insertOne({ userId: tokens.id_token, tokens });
    }

    return NextResponse.json(tokens) && NextResponse.redirect('/dashboard');
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
}