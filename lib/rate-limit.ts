import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || ''
});

interface RateLimitConfig {
  interval: number;              // Time window in milliseconds
  uniqueTokenPerInterval: number; // Maximum number of unique tokens per interval
}

export function rateLimit(config: RateLimitConfig) {
  return {
    async check(limit: number, token: string) {
      const now = Date.now();
      const key = `ratelimit:${token}:${Math.floor(now / config.interval)}`;
      
      try {
        const count = await kv.incr(key);
        
        // Set expiration for the key
        if (count === 1) {
          await kv.expire(key, Math.ceil(config.interval / 1000));
        }
        
        if (count > limit) {
          throw new Error('Rate limit exceeded');
        }
        
        return { success: true, limit, remaining: limit - count };
      } catch (error) {
        if (error instanceof Error && error.message === 'Rate limit exceeded') {
          throw error;
        }
        console.error('Rate limiting error:', error);
        // In case of error, allow the request
        return { success: true, limit, remaining: 1 };
      }
    }
  };
} 