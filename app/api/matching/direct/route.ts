import { NextRequest, NextResponse } from 'next/server';
import { Player, Group, calculateCompatibility, getCompatibilityLevel, createOptimizedGroups } from '../route';

// Sample players for testing
const samplePlayers: Player[] = [
  {
    id: "player1",
    interests: ["RPG", "Strategy", "FPS"],
    communicationStyle: "casual",
    platformPreference: "PC",
    playTimes: ["evening", "weekend"],
    language: "en",
    skillLevel: 7,
    contentTolerance: 8,
    themePreference: "Action"
  },
  {
    id: "player2",
    interests: ["RPG", "MOBA", "Strategy"],
    communicationStyle: "competitive",
    platformPreference: "PC",
    playTimes: ["evening", "night"],
    language: "en",
    skillLevel: 8,
    contentTolerance: 6,
    themePreference: "Action"
  },
  {
    id: "player3",
    interests: ["FPS", "Battle Royale", "Action"],
    communicationStyle: "tactical",
    platformPreference: "Console",
    playTimes: ["afternoon", "evening"],
    language: "en",
    skillLevel: 9,
    contentTolerance: 7,
    themePreference: "Competitive"
  },
  {
    id: "player4",
    interests: ["RPG", "Adventure", "Simulation"],
    communicationStyle: "relaxed",
    platformPreference: "PC",
    playTimes: ["morning", "weekend"],
    language: "es",
    skillLevel: 5,
    contentTolerance: 4,
    themePreference: "Fantasy"
  }
];

// Direct access endpoint for testing - no API key required
export async function GET(request: NextRequest) {
  try {
    // Create groups using our optimized algorithm
    const groups = createOptimizedGroups(samplePlayers, 2);
    
    // Calculate overall quality score
    const quality = groups.length > 0 
      ? Math.round(
          groups.reduce((sum: number, group: Group) => sum + group.compatibilityScore, 0) / groups.length
        )
      : 50;
    
    // Return the response
    const response = {
      groups,
      timestamp: new Date().toISOString(),
      quality,
      note: "This is a test endpoint that doesn't require API key validation"
    };
    
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('Error processing direct matching request:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// POST endpoint that accepts any API key for testing
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Use the players from the request if provided, otherwise use sample players
    const players = body.players || samplePlayers;
    const groupSize = body.groupSize || 2;
    
    // Create groups using our optimized algorithm
    const groups = createOptimizedGroups(players, groupSize);
    
    // Calculate overall quality score
    const quality = groups.length > 0 
      ? Math.round(
          groups.reduce((sum: number, group: Group) => sum + group.compatibilityScore, 0) / groups.length
        )
      : 50;
    
    // Return the response
    const response = {
      groups,
      timestamp: new Date().toISOString(),
      quality,
      note: "This is a direct endpoint that accepts any API key for testing"
    };
    
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('Error processing direct matching request:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 