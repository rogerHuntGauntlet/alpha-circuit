import { NextRequest, NextResponse } from 'next/server';
import { isValidApiKey } from '../../auth/keys';
import { validateApiKey } from '@/lib/api-keys';
import { generatePlayerGroups } from '@/lib/openai';
import { createPlayerGroups } from '@/lib/matching';
import { Player, Group, CompatibilityFactors, AlgorithmStatus, MatchingResponse as BaseMatchingResponse } from '@/app/lib/matching-utils';

// Define additional types specific to AI matching
interface MatchingRequest {
  apiKey: string;
  players: Player[];
  groupSize: number;
  optimizationGoal: 'social' | 'skill' | 'balanced';
  systemPrompt?: string;
}

interface AIGroup extends Group {
  riskFactors?: string[];
}

interface MatchingResponse extends BaseMatchingResponse {
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
    const attemptedAlgorithms: AlgorithmStatus[] = [];
    let finalAlgorithm: AlgorithmStatus['type'] = 'basic';
    
    try {
      // Try to use OpenAI for enhanced matching
      attemptedAlgorithms.push({
        type: 'ai',
        success: false
      });
      
      const aiGroups = await generatePlayerGroups({
        players,
        groupSize,
        optimizationGoal,
        systemPrompt: body.systemPrompt
      });
      
      // Update algorithm status to success
      attemptedAlgorithms[0].success = true;
      finalAlgorithm = 'ai';
      
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
      
    } catch (aiError: any) {
      console.error('Error using AI for matching, falling back to basic algorithm:', aiError);
      
      // Update algorithm status with error
      attemptedAlgorithms[0].error = {
        code: 'AI_MATCHING_FAILED',
        message: aiError.message || 'Unknown AI error'
      };
      
      // Try optimized algorithm
      attemptedAlgorithms.push({
        type: 'optimized',
        success: false
      });
      
      try {
        // Fall back to basic algorithm
        const fallbackGroups = createPlayerGroups(players, groupSize, optimizationGoal);
        
        // Update algorithm status
        attemptedAlgorithms[1].success = true;
        finalAlgorithm = 'optimized';
        
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
      } catch (optimizedError: any) {
        // Update algorithm status with error
        attemptedAlgorithms[1].error = {
          code: 'OPTIMIZED_MATCHING_FAILED',
          message: optimizedError.message || 'Unknown optimization error'
        };
        
        // Add basic algorithm attempt
        attemptedAlgorithms.push({
          type: 'basic',
          success: true
        });
        
        // Implement a very basic fallback here
        // This should never fail
        groups = [];
        for (let i = 0; i < players.length; i += groupSize) {
          const groupPlayers = players.slice(i, Math.min(i + groupSize, players.length));
          groups.push({
            groupId: `group${groups.length + 1}`,
            players: groupPlayers.map((p: Player) => p.id),
            compatibilityScore: 50,
            commonInterests: [],
            compatibilityFactors: {
              interests: 'low',
              communicationStyle: 'low',
              playTimes: 'low',
              skillLevel: 'low'
            },
            riskFactors: ['Emergency basic matching used']
          });
        }
      }
      
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
      aiPowered,
      algorithmStatus: {
        attempted: attemptedAlgorithms,
        final: finalAlgorithm
      }
    };
    
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('Error processing matching request:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error.message,
        algorithmStatus: {
          attempted: [{
            type: 'basic',
            success: false,
            error: {
              code: 'SYSTEM_ERROR',
              message: error.message || 'Unknown system error'
            }
          }],
          final: 'basic'
        }
      },
      { status: 500 }
    );
  }
} 