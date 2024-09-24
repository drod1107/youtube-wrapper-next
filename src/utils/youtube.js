// src/utils/youtube.js

import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { connectDB } from './mongodb';

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

async function getStoredTokens() {
  try {
    const db = await connectDB();
    const tokensCollection = db.collection('tokens');
    const tokens = await tokensCollection.findOne({});
    return tokens;
  } catch (error) {
    console.error('Error retrieving stored tokens:', error);
    return null;
  }
}

export async function getAuthenticatedYouTube() {
  const tokens = await getStoredTokens();
  if (tokens) {
    oauth2Client.setCredentials(tokens);
  } else {
    throw new Error('No tokens available. User needs to authenticate.');
  }

  return google.youtube({ version: 'v3', auth: oauth2Client });
}

export async function createPlaylists(orgName) {
  try {
    const youtube = await getAuthenticatedYouTube();

    const publicPlaylist = await youtube.playlists.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: orgName,
          description: `Public playlist for ${orgName}`,
        },
        status: {
          privacyStatus: 'public',
        },
      },
    });

    const unlistedPlaylist = await youtube.playlists.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: `${orgName} - unlisted`,
          description: `Unlisted playlist for ${orgName}`,
        },
        status: {
          privacyStatus: 'unlisted',
        },
      },
    });

    return {
      publicPlaylistId: publicPlaylist.data.id,
      unlistedPlaylistId: unlistedPlaylist.data.id,
    };
  } catch (error) {
    console.error('Error creating YouTube playlists:', error);
    throw new Error('Failed to create YouTube playlists');
  }
}