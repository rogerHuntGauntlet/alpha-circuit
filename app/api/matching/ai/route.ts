import { NextRequest, NextResponse } from 'next/server';
import { isValidApiKey } from '../../auth/keys';
import { validateApiKey } from '@/lib/api-keys';
import { generatePlayerGroups } from '@/lib/openai';
import { createPlayerGroups } from '@/lib/matching';
import { Player, Group, CompatibilityFactors } from '@/app/lib/matching-utils';

// Define additional types specific to AI matching
interface MatchingRequest {
  apiKey: string;
  players: Player[];
  groupSize: number;
  optimizationGoal: 'social' | 'skill' | 'balanced';
}

interface AIGroup extends Group {
  riskFactors?: string[];
}

interface MatchingResponse {
  groups: AIGroup[];
  timestamp: string;
  quality: number;
  aiPowered: boolean;
}

// This is an enhanced implementation of the matching API that uses OpenAI
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
    
    // Use our database API key validation
    let isValidKey = false;
    
    // First try the database validation
    try {
      isValidKey = await validateApiKey(body.apiKey);
    } catch (error) {
      console.error('Error validating API key with database:', error);
    }
    
    // If database validation fails, fall back to static validation for test keys
    if (!isValidKey) {
      isValidKey = isValidApiKey(body.apiKey);
    }
    
    // If still not valid, reject the request
    if (!isValidKey) {
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
      themePreference: player.themePreference || 'Neutral',
      pastBehavior: player.pastBehavior || { toxicityReports: 0, friendRequests: 0 }
    }));
    
    const groupSize: number = body.groupSize;
    const optimizationGoal: 'social' | 'skill' | 'balanced' = body.optimizationGoal;
    
    console.log('Processing AI matching request with players:', JSON.stringify(players, null, 2));
    
    let groups: AIGroup[] = [];
    let aiPowered = true;
    
    try {
      // Try to use OpenAI for enhanced matching
      const aiGroups = await generatePlayerGroups({
        players,
        groupSize,
        optimizationGoal
      });
      
      // Convert AI groups to our API format
      groups = aiGroups.map((group, index) => {
        // Find common interests for the group
        const groupPlayers = group.players.map(id => 
          players.find((p: Player) => p.id === id)!
        );
        
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
        
        return {
          groupId: `group${index + 1}`,
          players: group.players,
          compatibilityScore: group.compatibilityScore,
          commonInterests,
          compatibilityFactors: {
            interests: group.compatibilityScore > 80 ? 'high' : group.compatibilityScore > 50 ? 'medium' : 'low',
            communicationStyle: 'medium',
            playTimes: 'medium',
            skillLevel: 'medium'
          },
          riskFactors: group.riskFactors
        };
      });
      
    } catch (aiError) {
      console.error('Error using AI for matching, falling back to basic algorithm:', aiError);
      
      // Fall back to basic algorithm
      const fallbackGroups = createPlayerGroups(players, groupSize, optimizationGoal);
      
      // Convert fallback groups to our API format
      groups = fallbackGroups.map((group, index) => {
        // Find common interests for the group
        const groupPlayers = group.players.map(id => 
          players.find((p: Player) => p.id === id)!
        );
        
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
        
        return {
          groupId: `group${index + 1}`,
          players: group.players,
          compatibilityScore: group.compatibilityScore,
          commonInterests,
          compatibilityFactors: {
            interests: group.compatibilityScore > 80 ? 'high' : group.compatibilityScore > 50 ? 'medium' : 'low',
            communicationStyle: 'medium',
            playTimes: 'medium',
            skillLevel: 'medium'
          },
          riskFactors: group.riskFactors
        };
      });
      
      aiPowered = false;
    }
    
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
      quality,
      aiPowered
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