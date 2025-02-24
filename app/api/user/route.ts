import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { randomUUID } from 'crypto';
import { kv } from '@/lib/prisma';
import { generateApiKey, getUserApiKeys } from '@/lib/api-keys';
import { getUserApiStats } from '@/lib/api-usage';

// This endpoint returns user-specific data for the dashboard
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get user ID from session
    const userId = (session.user as any).id;
    
    // Get the user's API keys
    const apiKeys = await getUserApiKeys(userId);
    
    // Get the primary API key (most recent)
    const primaryApiKey = apiKeys.length > 0 ? apiKeys[0].key : null;
    
    // If no API key exists, generate one
    let apiKey = primaryApiKey;
    if (!apiKey) {
      apiKey = await generateApiKey(userId);
    }
    
    // Get user's API usage statistics
    const userStats = await getUserApiStats(userId);
    
    // Get pagination parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = 5;
    
    // Calculate pagination
    const totalPages = Math.ceil(userStats.totalMatchCount / pageSize);
    const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));
    
    // Return the user data
    return NextResponse.json({
      apiKey,
      stats: userStats.stats,
      recentMatches: userStats.recentMatches,
      totalMatchCount: userStats.totalMatchCount,
      currentPage,
      totalPages
    });
    
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// Endpoint to generate a new API key for the user
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get user ID from session
    const userId = (session.user as any).id;
    
    // Generate a new API key
    const newApiKey = await generateApiKey(userId);
    
    return NextResponse.json({
      apiKey: newApiKey,
      message: 'New API key generated successfully'
    });
    
  } catch (error: any) {
    console.error('Error generating API key:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 