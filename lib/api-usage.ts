import { NextRequest, NextResponse } from 'next/server';
import { kv } from './prisma';
import { validateApiKey } from './api-keys';
import { headers } from 'next/headers';

// Define types for our KV data structures
interface ApiKeyData {
  userId: string;
  id: string;
  key: string;
  lastUsed?: number;
}

interface MatchData {
  id: string;
  status: string;
  playerCount: number;
  groupCount: number;
  optimizationType: string;
  quality?: number;
  createdAt: number;
}

/**
 * Middleware to track API usage
 * This should be called in API routes that need usage tracking
 */
export async function trackApiUsage(
  req: NextRequest,
  apiKey: string,
  endpoint: string,
  startTime: number = Date.now()
) {
  try {
    // Get user ID from API key
    const apiKeyData = await kv.get(`apikey:${apiKey}`) as ApiKeyData | null;
    
    if (!apiKeyData) {
      return false;
    }

    const userId = apiKeyData.userId;
    const apiKeyId = apiKeyData.id;

    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Get IP and user agent
    const headersList = headers();
    const ipAddress = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    // Generate a unique ID for the usage record
    const usageId = `usage:${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    
    // Log the API usage
    await kv.set(usageId, {
      userId,
      apiKeyId,
      endpoint,
      method: req.method,
      statusCode: 200, // This will be updated later if needed
      responseTime,
      ipAddress,
      userAgent,
      timestamp: Date.now()
    });

    // Add to user's usage list
    await kv.lpush(`user:${userId}:usage`, usageId);
    
    // Update the last used timestamp for the API key
    await kv.hset(`apikey:${apiKey}`, { lastUsed: Date.now() });

    return true;
  } catch (error) {
    console.error('Error tracking API usage:', error);
    return false;
  }
}

/**
 * Get API usage statistics for a user
 */
export async function getUserApiStats(userId: string) {
  try {
    // Get usage IDs for this user
    const usageIds = await kv.lrange(`user:${userId}:usage`, 0, -1) || [];
    
    // Get match IDs for this user
    const matchIds = await kv.lrange(`user:${userId}:matches`, 0, -1) || [];
    
    // Count total API calls
    const totalApiCalls = usageIds.length;

    // Count total matches
    const totalMatches = matchIds.length;

    // Get match data for quality calculation and recent matches
    const matchPromises = matchIds.slice(0, 5).map(id => kv.get(id));
    const matches = await Promise.all(matchPromises);
    
    // Calculate average match quality
    let qualitySum = 0;
    let qualityCount = 0;
    
    for (const match of matches) {
      const matchData = match as MatchData | null;
      if (matchData && typeof matchData.quality === 'number') {
        qualitySum += matchData.quality;
        qualityCount++;
      }
    }
    
    const averageMatchQuality = qualityCount > 0 ? Math.round(qualitySum / qualityCount) : 0;

    // Format recent matches for the frontend
    const formattedMatches = matches
      .filter(match => match !== null)
      .map((match: any) => ({
        id: match.id,
        status: match.status,
        details: `${match.playerCount} players • ${match.groupCount} groups • ${match.optimizationType} optimization`,
        createdAt: new Date(match.createdAt || Date.now()).toISOString()
      }));

    return {
      stats: {
        totalMatches,
        apiUsage: totalApiCalls,
        averageMatchQuality
      },
      recentMatches: formattedMatches,
      totalMatchCount: totalMatches
    };
  } catch (error) {
    console.error('Error getting user API stats:', error);
    throw error;
  }
} 