import { NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const kv = createClient({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || ''
});

export async function POST(req: Request) {
  try {
    const { name, email, password, company } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await kv.hgetall(`user:${email}`);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate API key
    const apiKey = `circuit_${crypto.randomBytes(32).toString('hex')}`;

    // Create user
    const userId = crypto.randomUUID();
    const user = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      company,
      apiKey,
      createdAt: Date.now(),
    };

    // Store user in KV
    await kv.hset(`user:${email}`, user);
    await kv.set(`apikey:${apiKey}`, userId);

    // Return success without sensitive data
    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name,
        email,
        company,
        apiKey,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 