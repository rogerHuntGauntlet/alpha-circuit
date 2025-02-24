import { createClient } from '@vercel/kv';

// Create a KV client to replace Prisma
export const kv = createClient({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || ''
});

// This file is kept to maintain compatibility with existing imports
// but now uses Vercel KV instead of Prisma 