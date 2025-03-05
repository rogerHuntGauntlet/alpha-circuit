import { NextRequest, NextResponse } from 'next/server';
import { isValidApiKey } from '../../auth/keys';
import { validateApiKey } from '@/lib/api-keys';
import { Player, Group, MatchingResponse } from '@/app/lib/matching-utils';

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
    
    console.log('Using basic algorithm as requested');

    try {
      // Implement a very basic grouping algorithm
      const groups: Group[] = [];
      for (let i = 0; i < players.length; i += groupSize) {
        const groupPlayers = players.slice(i, Math.min(i + groupSize, players.length));
        groups.push({
          groupId: `group${groups.length + 1}`,
          players: groupPlayers.map((p: Player) => p.id),
          compatibilityScore: 50, // Default medium compatibility
          commonInterests: [],
          compatibilityFactors: {
            interests: 'medium',
            communicationStyle: 'medium',
            playTimes: 'medium',
            skillLevel: 'medium'
          },
          riskFactors: ['Basic algorithm used - no sophisticated matching']
        });
      }
      
      // Calculate overall quality score (0-100)
      const quality = 50; // Basic algorithm always returns medium quality
      
      // Return the response
      const response: MatchingResponse = {
        groups,
        timestamp: new Date().toISOString(),
        quality,
        algorithmStatus: {
          attempted: [
            {
              type: 'basic',
              success: true
            }
          ],
          final: 'basic'
        }
      };
      
      return NextResponse.json(response);
    } catch (error: any) {
      console.error('Basic algorithm failed (this should never happen):', error);
      
      // Even if the basic algorithm fails, we'll return an empty group
      // This is the absolute last resort
      const response: MatchingResponse = {
        groups: [],
        timestamp: new Date().toISOString(),
        quality: 0,
        algorithmStatus: {
          attempted: [
            {
              type: 'basic',
              success: false,
              error: {
                code: 'BASIC_MATCHING_FAILED',
                message: error.message || 'Unknown basic algorithm error'
              }
            }
          ],
          final: 'basic'
        }
      };
      
      return NextResponse.json(response);
    }
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