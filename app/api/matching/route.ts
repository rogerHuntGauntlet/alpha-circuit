import { NextRequest, NextResponse } from 'next/server';
import { isValidApiKey } from '../auth/keys';

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

// Simple function to calculate compatibility between two players
function calculateCompatibility(player1: Player, player2: Player): number {
  let score = 0;
  
  // Interest overlap
  const player1Interests = player1.interests || [];
  const player2Interests = player2.interests || [];
  
  const sharedInterests = player1Interests.filter(interest => 
    player2Interests.includes(interest)
  ).length;
  
  const maxInterests = Math.max(player1Interests.length, player2Interests.length);
  score += maxInterests > 0 ? (sharedInterests / maxInterests) * 25 : 0;
  
  // Language match
  if (player1.language === player2.language) {
    score += 15;
  }
  
  // Platform preference
  if (player1.platformPreference === player2.platformPreference) {
    score += 10;
  }
  
  // Skill level compatibility (closer is better)
  const player1Skill = player1.skillLevel || 5;
  const player2Skill = player2.skillLevel || 5;
  const skillDifference = Math.abs(player1Skill - player2Skill);
  score += Math.max(0, 15 - (skillDifference * 3));
  
  return Math.min(score, 100);
}

// Simple function to create player groups
function createBasicGroups(players: Player[], groupSize: number): Group[] {
  const groups: Group[] = [];
  
  // Create groups by simply chunking the players array
  for (let i = 0; i < players.length; i += groupSize) {
    const groupPlayers = players.slice(i, i + groupSize);
    const playerIds = groupPlayers.map(p => p.id);
    
    // Calculate average compatibility score for the group
    let totalScore = 0;
    let pairCount = 0;
    
    for (let j = 0; j < groupPlayers.length; j++) {
      for (let k = j + 1; k < groupPlayers.length; k++) {
        totalScore += calculateCompatibility(groupPlayers[j], groupPlayers[k]);
        pairCount++;
      }
    }
    
    const compatibilityScore = pairCount > 0 ? totalScore / pairCount : 50;
    
    // Find common interests
    let commonInterests: string[] = [];
    if (groupPlayers.length > 0) {
      const allInterests = groupPlayers.map(p => p.interests || []);
      if (allInterests.length > 0 && allInterests[0].length > 0) {
        commonInterests = [...allInterests[0]];
        for (let j = 1; j < allInterests.length; j++) {
          commonInterests = commonInterests.filter(interest => 
            allInterests[j].includes(interest)
          );
        }
      }
    }
    
    groups.push({
      groupId: `group${groups.length + 1}`,
      players: playerIds,
      compatibilityScore,
      commonInterests,
      compatibilityFactors: {
        interests: 'medium',
        communicationStyle: 'medium',
        playTimes: 'medium',
        skillLevel: 'medium'
      }
    });
  }
  
  return groups;
}

// This is a simplified implementation of the matching API
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate API key
    if (!body.apiKey) {
      return NextResponse.json(
        { error: 'Missing API key' },
        { status: 401 }
      );
    }
    
    // Use our secure API key validation
    if (!isValidApiKey(body.apiKey)) {
      // Log the attempt but don't reveal which part of the validation failed
      console.warn(`Invalid API key attempt: ${body.apiKey.substring(0, 4)}****`);
      
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 403 }
      );
    }
    
    // Validate required fields
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
    
    // Normalize player data
    const players = body.players.map((player: Player) => ({
      id: player.id || `player-${Math.random().toString(36).substring(2, 9)}`,
      interests: Array.isArray(player.interests) ? player.interests : [],
      communicationStyle: player.communicationStyle || 'neutral',
      platformPreference: player.platformPreference || 'any',
      playTimes: Array.isArray(player.playTimes) ? player.playTimes : ['anytime'],
      language: player.language || 'en',
      skillLevel: typeof player.skillLevel === 'number' ? player.skillLevel : 5,
      contentTolerance: typeof player.contentTolerance === 'number' ? player.contentTolerance : 5,
      themePreference: player.themePreference || 'Neutral'
    }));
    
    const groupSize: number = body.groupSize;
    const optimizationGoal: 'social' | 'skill' | 'balanced' = body.optimizationGoal;
    
    console.log('Processing matching request with players:', JSON.stringify(players, null, 2));
    
    // Create groups using our simplified algorithm
    const groups = createBasicGroups(players, groupSize);
    
    console.log('Created groups:', JSON.stringify(groups, null, 2));
    
    // Calculate overall quality score (0-100)
    const quality = groups.length > 0 
      ? Math.round(
          groups.reduce((sum, group) => sum + group.compatibilityScore, 0) / groups.length * 100
        )
      : 50;
    
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