// src/app/api/init-user/route.js

import connectDB from '@/utils/mongodb';
import { updateUserPlaylists } from '@/utils/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, firstName, lastName, orgName, permission } = await req.json();

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = new User({
        email,
        first_name: firstName,
        last_name: lastName,
        org_name: orgName,
        permission,
      });

      await newUser.save();
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
