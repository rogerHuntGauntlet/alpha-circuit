import { NextRequest, NextResponse } from 'next/server';

// This is a direct access endpoint that always returns a sample response
// It can be accessed via a GET request without any authentication
export async function GET(request: NextRequest) {
  try {
    // Sample response
    const response = {
      groups: [
        {
          groupId: 'group1',
          players: ['player1', 'player2'],
          compatibilityScore: 85,
          commonInterests: ['RPG', 'Strategy'],
          compatibilityFactors: {
            interests: 'high',
            communicationStyle: 'medium',
            playTimes: 'high',
            skillLevel: 'high'
          }
        }
      ],
      timestamp: new Date().toISOString(),
      quality: 85,
      message: "This is a direct access endpoint that doesn't require authentication"
    };
    
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('Error processing direct request:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 