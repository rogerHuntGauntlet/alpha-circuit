import { NextRequest, NextResponse } from 'next/server';
import { isValidApiKey, isValidApiKeyDev } from '../../auth/keys';

// This is a test endpoint that returns a sample response from the matching API
// It can be accessed via a GET request, making it easy to test in a browser
export async function GET(request: NextRequest) {
  try {
    // Get API key from query parameter
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('apiKey') || 'test-key';
    
    // For testing purposes, we'll accept any of the known test keys
    // This is more lenient than the production endpoint
    const validTestKeys = ['test-key', 'dev-key-123', 'prod-key-456', 'gauntlet-api-key'];
    const isValid = validTestKeys.includes(apiKey) || isValidApiKey(apiKey);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 403 }
      );
    }
    
    // Sample players data
    const players = [
      {
        id: 'player1',
        interests: ['RPG', 'Strategy', 'FPS'],
        communicationStyle: 'casual',
        platformPreference: 'PC',
        playTimes: ['evening', 'weekend'],
        language: 'en',
        skillLevel: 7,
        contentTolerance: 8,
        themePreference: 'Action'
      },
      {
        id: 'player2',
        interests: ['RPG', 'MOBA', 'Strategy'],
        communicationStyle: 'competitive',
        platformPreference: 'PC',
        playTimes: ['evening', 'night'],
        language: 'en',
        skillLevel: 8,
        contentTolerance: 6,
        themePreference: 'Action'
      }
    ];
    
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
      quality: 85
    };
    
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('Error processing test request:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 