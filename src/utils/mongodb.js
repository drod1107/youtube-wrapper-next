// src/utils/mongodb.js
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import User from '@/models/User';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Default export for MongoDB client promise
export default clientPromise;

// Function to connect with Mongoose
export async function connectDB() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(uri, options);
  }
  return mongoose.connection;
}

// Function to fetch videos from MongoDB
export async function getVideos(playlistId) {
  const client = await clientPromise;
  const db = client.db();
  const videos = await db.collection('videos').find({ playlistId }).toArray();
  return videos;
}

// Function to update user playlists
export async function updateUserPlaylists(userId, playlistIds) {
  try {
    const result = await User.updateOne(
      { _id: mongoose.Types.ObjectId(userId) },
      {
        $set: {
          public_playlist_id: playlistIds.public,
          unlisted_playlist_id: playlistIds.unlisted,
        },
      }
    );
    return result;
  } catch (error) {
    console.error('Error updating user playlists:', error);
    throw new Error('Failed to update user playlists');
  }
}
