import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || ''
});

interface RateLimitConfig {
  maxRequests: number;  // Maximum number of requests
  windowMs: number;     // Time window in milliseconds
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 100, windowMs: 60 * 1000 } // Default: 100 requests per minute
): Promise<boolean> {
  try {
    const now = Date.now();
    const key = `ratelimit:${identifier}`;
    
    // Get current requests data
    const data = await kv.get<{ requests: number; windowStart: number }>(key);
    
    if (!data) {
      // First request, initialize counter
      await kv.set(key, { requests: 1, windowStart: now }, { ex: Math.ceil(config.windowMs / 1000) });
      return true;
    }

    if (now - data.windowStart >= config.windowMs) {
      // Window expired, reset counter
      await kv.set(key, { requests: 1, windowStart: now }, { ex: Math.ceil(config.windowMs / 1000) });
      return true;
    }

    if (data.requests >= config.maxRequests) {
      // Rate limit exceeded
      return false;
    }

    // Increment request counter
    await kv.set(key, 
      { requests: data.requests + 1, windowStart: data.windowStart },
      { ex: Math.ceil((config.windowMs - (now - data.windowStart)) / 1000) }
    );
    return true;
  } catch (error) {
    console.error('Rate limiting error:', error);
    // In case of error, allow the request
    return true;
  }
} 