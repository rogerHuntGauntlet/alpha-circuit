import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
    
    // In a real application, you would fetch this data from your database
    // based on the user ID. For now, we'll return some sample data.
    
    // Get user's API usage statistics
    const userStats = {
      totalMatches: 42, // This would come from your database
      apiUsage: 1250,   // This would come from your database
      averageMatchQuality: 87 // This would come from your database
    };
    
    // Get user's recent matches
    const recentMatches = [
      {
        id: 'match-001',
        status: 'Completed',
        details: '24 players • 6 groups • skill optimization',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
      },
      {
        id: 'match-002',
        status: 'Completed',
        details: '16 players • 4 groups • social optimization',
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() // 8 hours ago
      },
      {
        id: 'match-003',
        status: 'Completed',
        details: '32 players • 8 groups • balanced optimization',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      },
      {
        id: 'match-004',
        status: 'Completed',
        details: '20 players • 5 groups • skill optimization',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
      },
      {
        id: 'match-005',
        status: 'Completed',
        details: '28 players • 7 groups • social optimization',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
      }
    ];
    
    // Return the user data
    return NextResponse.json({
      stats: userStats,
      recentMatches: recentMatches,
      totalMatchCount: 12 // Total number of matches for pagination
    });
    
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 