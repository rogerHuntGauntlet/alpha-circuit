import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Define types for our API
interface Player {
  id: string;
  interests?: string[];
  communicationStyle?: string;
  platformPreference?: string;
  playTimes?: string[];
  language?: string;
  skillLevel?: number;
  contentTolerance?: number;
  themePreference?: string;
  [key: string]: any; // Allow for additional properties
}

interface MatchingRequest {
  apiKey: string;
  players: Player[];
  groupSize: number;
  optimizationGoal: 'social' | 'skill' | 'balanced';
}

interface CompatibilityFactors {
  interests?: string;
  communicationStyle?: string;
  playTimes?: string;
  skillLevel?: string;
  [key: string]: string | undefined;
}

interface Group {
  groupId: string;
  players: string[];
  compatibilityScore: number;
  commonInterests: string[];
  compatibilityFactors: CompatibilityFactors;
}

interface MatchingResponse {
  groups: Group[];
  timestamp: string;
  quality: number;
}

// This is a mock implementation of the matching API
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.apiKey) {
      return NextResponse.json(
        { error: 'Missing API key' },
        { status: 401 }
      );
    }
    
    if (!body.players || !Array.isArray(body.players) || body.players.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 players are required' },
        { status: 400 }
      );
    }
    
    if (!body.groupSize || typeof body.groupSize !== 'number' || body.groupSize < 1) {
      return NextResponse.json(
        { error: 'Valid groupSize is required' },
        { status: 400 }
      );
    }
    
    if (!body.optimizationGoal || !['social', 'skill', 'balanced'].includes(body.optimizationGoal)) {
      return NextResponse.json(
        { error: 'optimizationGoal must be one of: social, skill, balanced' },
        { status: 400 }
      );
    }
    
    // In a real implementation, we would:
    // 1. Validate the API key against the database
    // 2. Check rate limits
    // 3. Process the request with OpenAI
    // 4. Store the results
    
    // For now, we'll return a mock response based on the input
    const players: Player[] = body.players;
    const groupSize: number = body.groupSize;
    const optimizationGoal: 'social' | 'skill' | 'balanced' = body.optimizationGoal;
    
    // Calculate how many groups we need
    const numGroups = Math.ceil(players.length / groupSize);
    
    // Create groups
    const groups: Group[] = [];
    for (let i = 0; i < numGroups; i++) {
      const groupPlayers = players
        .slice(i * groupSize, Math.min((i + 1) * groupSize, players.length))
        .map((player: Player) => player.id);
      
      // Find common interests for the group
      const interests = players
        .filter((player: Player) => groupPlayers.includes(player.id))
        .map((player: Player) => player.interests || []);
      
      const commonInterests = interests.length > 0 
        ? interests.reduce((acc: string[], curr: string[]) => 
            acc.filter((interest: string) => curr.includes(interest))
          )
        : [];
      
      // Generate a random compatibility score between 0.65 and 0.95
      const compatibilityScore = Math.round((0.65 + Math.random() * 0.3) * 100) / 100;
      
      // Create compatibility factors based on optimization goal
      let compatibilityFactors: CompatibilityFactors = {};
      
      if (optimizationGoal === 'social') {
        compatibilityFactors = {
          interests: Math.random() > 0.5 ? 'high' : 'medium',
          communicationStyle: Math.random() > 0.5 ? 'high' : 'medium',
          playTimes: Math.random() > 0.5 ? 'high' : 'medium'
        };
      } else if (optimizationGoal === 'skill') {
        compatibilityFactors = {
          skillLevel: 'high',
          interests: Math.random() > 0.5 ? 'medium' : 'low',
          communicationStyle: Math.random() > 0.5 ? 'medium' : 'low'
        };
      } else {
        compatibilityFactors = {
          interests: Math.random() > 0.5 ? 'medium' : 'high',
          skillLevel: Math.random() > 0.5 ? 'medium' : 'high',
          communicationStyle: Math.random() > 0.5 ? 'medium' : 'low'
        };
      }
      
      groups.push({
        groupId: `group${i + 1}`,
        players: groupPlayers,
        compatibilityScore,
        commonInterests: commonInterests.slice(0, 3), // Limit to 3 common interests
        compatibilityFactors
      });
    }
    
    // Calculate overall quality score (0-100)
    const quality = Math.round(
      groups.reduce((sum, group) => sum + group.compatibilityScore, 0) / groups.length * 100
    );
    
    // Return the response
    const response: MatchingResponse = {
      groups,
      timestamp: new Date().toISOString(),
      quality
    };
    
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('Error processing matching request:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 