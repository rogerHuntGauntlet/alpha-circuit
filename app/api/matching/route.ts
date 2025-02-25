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

// Enhanced function to create player groups with better mixing
function createOptimizedGroups(players: Player[], groupSize: number): Group[] {
  const groups: Group[] = [];
  
  // Calculate compatibility matrix for all player pairs
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {};
  
  for (let i = 0; i < players.length; i++) {
    compatibilityMatrix[players[i].id] = {};
    for (let j = 0; j < players.length; j++) {
      if (i !== j) {
        compatibilityMatrix[players[i].id][players[j].id] = calculateCompatibility(players[i], players[j]);
      }
    }
  }
  
  // Create a copy of players array to work with
  let remainingPlayers = [...players];
  
  // While we have enough players to form a group
  while (remainingPlayers.length >= groupSize) {
    // Start a new group with a random player
    const randomIndex = Math.floor(Math.random() * remainingPlayers.length);
    const firstPlayer = remainingPlayers[randomIndex];
    
    // Remove the first player from remaining players
    remainingPlayers.splice(randomIndex, 1);
    
    // Current group starts with the first player
    const currentGroup = [firstPlayer];
    
    // Add the most compatible players to the group
    while (currentGroup.length < groupSize && remainingPlayers.length > 0) {
      let bestCompatibilityScore = -1;
      let bestPlayerIndex = -1;
      
      // Find the player with highest average compatibility with current group
      for (let i = 0; i < remainingPlayers.length; i++) {
        const candidate = remainingPlayers[i];
        let totalScore = 0;
        
        for (const groupMember of currentGroup) {
          totalScore += compatibilityMatrix[groupMember.id][candidate.id];
        }
        
        const averageScore = totalScore / currentGroup.length;
        
        if (averageScore > bestCompatibilityScore) {
          bestCompatibilityScore = averageScore;
          bestPlayerIndex = i;
        }
      }
      
      // Add the best player to the group
      if (bestPlayerIndex !== -1) {
        currentGroup.push(remainingPlayers[bestPlayerIndex]);
        remainingPlayers.splice(bestPlayerIndex, 1);
      }
    }
    
    // Calculate group compatibility metrics
    const playerIds = currentGroup.map(p => p.id);
    let totalScore = 0;
    let pairCount = 0;
    
    for (let i = 0; i < currentGroup.length; i++) {
      for (let j = i + 1; j < currentGroup.length; j++) {
        totalScore += compatibilityMatrix[currentGroup[i].id][currentGroup[j].id];
        pairCount++;
      }
    }
    
    const compatibilityScore = pairCount > 0 ? Math.round(totalScore / pairCount) : 50;
    
    // Find common interests
    let commonInterests: string[] = [];
    if (currentGroup.length > 0) {
      const allInterests = currentGroup.map(p => p.interests || []);
      if (allInterests.length > 0 && allInterests[0].length > 0) {
        commonInterests = [...allInterests[0]];
        for (let j = 1; j < allInterests.length; j++) {
          commonInterests = commonInterests.filter(interest => 
            allInterests[j].includes(interest)
          );
        }
      }
    }
    
    // Calculate compatibility factors
    const compatibilityFactors: CompatibilityFactors = {
      interests: getCompatibilityLevel(currentGroup, 'interests'),
      communicationStyle: getCompatibilityLevel(currentGroup, 'communicationStyle'),
      playTimes: getCompatibilityLevel(currentGroup, 'playTimes'),
      skillLevel: getCompatibilityLevel(currentGroup, 'skillLevel')
    };
    
    // Add the group
    groups.push({
      groupId: `group${groups.length + 1}`,
      players: playerIds,
      compatibilityScore,
      commonInterests,
      compatibilityFactors
    });
  }
  
  // Handle remaining players if any (less than groupSize)
  if (remainingPlayers.length > 0) {
    const playerIds = remainingPlayers.map(p => p.id);
    
    groups.push({
      groupId: `group${groups.length + 1}`,
      players: playerIds,
      compatibilityScore: 50, // Default score for incomplete group
      commonInterests: [],
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

// Helper function to determine compatibility level for a specific attribute
function getCompatibilityLevel(players: Player[], attribute: string): string {
  if (players.length <= 1) return 'medium';
  
  let similarity = 0;
  let totalComparisons = 0;
  
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      totalComparisons++;
      
      if (attribute === 'interests') {
        const player1Interests = players[i].interests || [];
        const player2Interests = players[j].interests || [];
        
        const sharedInterests = player1Interests.filter(interest => 
          player2Interests.includes(interest)
        ).length;
        
        const maxInterests = Math.max(player1Interests.length, player2Interests.length);
        similarity += maxInterests > 0 ? sharedInterests / maxInterests : 0;
      } 
      else if (attribute === 'playTimes') {
        const player1Times = players[i].playTimes || [];
        const player2Times = players[j].playTimes || [];
        
        const sharedTimes = player1Times.filter(time => 
          player2Times.includes(time)
        ).length;
        
        const maxTimes = Math.max(player1Times.length, player2Times.length);
        similarity += maxTimes > 0 ? sharedTimes / maxTimes : 0;
      }
      else if (attribute === 'skillLevel') {
        const player1Skill = players[i].skillLevel || 5;
        const player2Skill = players[j].skillLevel || 5;
        const skillDifference = Math.abs(player1Skill - player2Skill);
        
        // Convert to similarity (0-1 range)
        similarity += Math.max(0, 1 - (skillDifference / 10));
      }
      else {
        // For string attributes like communicationStyle
        similarity += players[i][attribute] === players[j][attribute] ? 1 : 0;
      }
    }
  }
  
  const averageSimilarity = similarity / totalComparisons;
  
  if (averageSimilarity >= 0.7) return 'high';
  if (averageSimilarity >= 0.4) return 'medium';
  return 'low';
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
    
    // Create groups using our optimized algorithm instead of the basic one
    const groups = createOptimizedGroups(players, groupSize);
    
    console.log('Created groups:', JSON.stringify(groups, null, 2));
    
    // Calculate overall quality score (0-100)
    const quality = groups.length > 0 
      ? Math.round(
          groups.reduce((sum, group) => sum + group.compatibilityScore, 0) / groups.length
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