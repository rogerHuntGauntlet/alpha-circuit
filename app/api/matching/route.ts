import { NextRequest, NextResponse } from 'next/server';
import { generatePlayerGroups, type GroupingRequest } from '@/lib/openai';
import { z } from 'zod';

// Schema for the request body
const matchingRequestSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  players: z.array(
    z.object({
      id: z.string(),
      interests: z.array(z.string()),
      communicationStyle: z.string(),
      platformPreference: z.string(),
      playTimes: z.array(z.string()),
      language: z.string(),
      skillLevel: z.number().min(0).max(10),
      contentTolerance: z.number().min(0).max(10),
      themePreference: z.enum(['Action', 'Neutral', 'Soothing']),
      pastBehavior: z
        .object({
          toxicityReports: z.number(),
          friendRequests: z.number(),
        })
        .optional(),
    })
  ).min(1, "At least one player is required"),
  groupSize: z.number().min(2, "Group size must be at least 2"),
  optimizationGoal: z.enum(['social', 'skill', 'balanced']),
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the request payload
    const result = matchingRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request payload', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { apiKey, players, groupSize, optimizationGoal } = result.data;
    
    // API key validation would happen here in a real implementation
    // This is just a placeholder
    if (apiKey !== 'test-api-key') {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }
    
    // Check if we have enough players for the requested group size
    if (players.length < groupSize) {
      return NextResponse.json(
        { error: 'Not enough players for the requested group size' },
        { status: 400 }
      );
    }
    
    // Call the OpenAI function to generate player groups
    const playerGroups = await generatePlayerGroups({
      players,
      groupSize,
      optimizationGoal,
    });
    
    // Return the results
    return NextResponse.json({
      matchId: 'match_' + Date.now(), // In a real app, this would be a database ID
      groups: playerGroups,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error processing matching request:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 