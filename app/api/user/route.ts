import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { randomUUID } from 'crypto';

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
    const email = session.user.email;
    
    // In a real application, you would fetch this data from your database
    // based on the user ID. For now, we'll generate deterministic data based on the user's email
    // to ensure the same user always gets the same data
    
    // Create a simple hash of the email for deterministic "random" values
    const emailHash = Array.from(email || 'default@example.com').reduce(
      (hash, char) => (hash * 31 + char.charCodeAt(0)) & 0xFFFFFFFF, 0
    );
    
    // Get user's API usage statistics - deterministic based on user email
    const userStats = {
      totalMatches: 30 + (emailHash % 50), // Between 30-79 matches
      apiUsage: 800 + (emailHash % 2000),  // Between 800-2799 API calls
      averageMatchQuality: 75 + (emailHash % 20) // Between 75-94% quality
    };
    
    // Generate match details specific to this user
    const optimizationTypes = ['skill', 'social', 'balanced'];
    const recentMatches = Array.from({ length: 5 }).map((_, index) => {
      const matchHash = (emailHash + index) & 0xFFFFFFFF;
      const playerCount = 12 + (matchHash % 28); // Between 12-39 players
      const groupCount = Math.max(2, Math.floor(playerCount / 4)); // Reasonable group count
      const optimizationType = optimizationTypes[matchHash % 3];
      
      return {
        id: `match-${userId}-${100 + index}`,
        status: 'Completed',
        details: `${playerCount} players • ${groupCount} groups • ${optimizationType} optimization`,
        createdAt: new Date(Date.now() - (index + 1) * 12 * 60 * 60 * 1000).toISOString() // Staggered times
      };
    });
    
    // Return the user data
    return NextResponse.json({
      stats: userStats,
      recentMatches: recentMatches,
      totalMatchCount: userStats.totalMatches,
      currentPage: 1,
      totalPages: Math.ceil(userStats.totalMatches / 5)
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
    
    // Generate a new API key
    const newApiKey = `circuit_${randomUUID().replace(/-/g, '')}`;
    
    // In a real application, you would save this API key to the user's record in your database
    // For now, we'll just return it
    
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