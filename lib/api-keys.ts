import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || ''
});

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    if (!apiKey.startsWith('circuit_')) {
      return false;
    }

    const userId = await kv.get(`apikey:${apiKey}`);
    return !!userId;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
} 