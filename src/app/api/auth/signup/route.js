// src/app/api/auth/signup/route.js

import { NextResponse } from 'next/server'
import clientPromise from '../../../../utils/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { email, password, firstName, lastName, phone, organizationName, organizationAddress } = await req.json()
    const client = await clientPromise
    const db = client.db()

    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      organizationName,
      organizationAddress,
      profileCompleted: true
    })

    return NextResponse.json({ success: true, userId: newUser.insertedId })
  } catch (error) {
    console.error('Error during signup:', error)
    return NextResponse.json({ error: 'An error occurred during signup' }, { status: 500 })
  }
}