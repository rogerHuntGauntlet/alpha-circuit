import { NextRequest, NextResponse } from 'next/server';
import { prisma } from './prisma';
import { validateApiKey } from './api-keys';
import { headers } from 'next/headers';

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
    const userId = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      select: { userId: true, id: true }
    });

    if (!userId) {
      return false;
    }

    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Get IP and user agent
    const headersList = headers();
    const ipAddress = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    // Log the API usage
    await prisma.apiUsage.create({
      data: {
        userId: userId.userId,
        apiKeyId: userId.id,
        endpoint,
        method: req.method,
        statusCode: 200, // This will be updated later if needed
        responseTime,
        ipAddress,
        userAgent
      }
    });

    // Update the last used timestamp for the API key
    await prisma.apiKey.update({
      where: { id: userId.id },
      data: { lastUsed: new Date() }
    });

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
    // Get total API calls
    const totalApiCalls = await prisma.apiUsage.count({
      where: { userId }
    });

    // Get total matches
    const totalMatches = await prisma.match.count({
      where: { userId }
    });

    // Get average match quality
    const matchQualityResult = await prisma.match.aggregate({
      where: { userId },
      _avg: { quality: true }
    });
    
    const averageMatchQuality = Math.round(matchQualityResult._avg.quality || 0);

    // Get recent matches
    const recentMatches = await prisma.match.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        status: true,
        playerCount: true,
        groupCount: true,
        optimizationType: true,
        createdAt: true
      }
    });

    // Format recent matches for the frontend
    const formattedMatches = recentMatches.map((match: {
      id: string;
      status: string;
      playerCount: number;
      groupCount: number;
      optimizationType: string;
      createdAt: Date;
    }) => ({
      id: match.id,
      status: match.status,
      details: `${match.playerCount} players • ${match.groupCount} groups • ${match.optimizationType} optimization`,
      createdAt: match.createdAt.toISOString()
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