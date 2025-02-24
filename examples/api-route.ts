// File: app/api/matching/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generatePlayerGroups } from '@/lib/openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { validateApiKey } from '@/lib/api-keys';
import { rateLimit } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';
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

// Rate limit configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 100,
});

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated (for internal usage)
    const session = await getServerSession(authOptions);
    
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
    
    // API key validation for external clients
    if (!session) {
      const keyValidation = await validateApiKey(apiKey);
      if (!keyValidation.valid) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }
      
      // Apply rate limiting to API clients
      try {
        await limiter.check(20, apiKey); // 20 requests per minute per API key
      } catch (error) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }
    }
    
    // Check if we have enough players for the requested group size
    if (players.length < groupSize) {
      return NextResponse.json(
        { error: 'Not enough players for the requested group size' },
        { status: 400 }
      );
    }
    
    // Log the matching request to the database
    const matchRequest = await prisma.matchRequest.create({
      data: {
        userId: session?.user?.id || keyValidation.userId,
        playersCount: players.length,
        groupSize,
        optimizationGoal,
        status: 'processing',
      },
    });
    
    // Call the OpenAI function to generate player groups
    const playerGroups = await generatePlayerGroups({
      players,
      groupSize,
      optimizationGoal,
    });
    
    // Store the results
    const match = await prisma.match.create({
      data: {
        id: matchRequest.id,
        userId: session?.user?.id || keyValidation.userId,
        groups: playerGroups,
        parameters: {
          groupSize,
          optimizationGoal,
          playersCount: players.length,
        },
      },
    });
    
    // Update the match request status
    await prisma.matchRequest.update({
      where: { id: matchRequest.id },
      data: { status: 'completed' },
    });
    
    // Track API usage
    if (!session) {
      await prisma.apiUsage.create({
        data: {
          userId: keyValidation.userId,
          endpoint: 'matching',
          tokensUsed: 0, // This would be obtained from the OpenAI completion
          cost: 0, // This would be calculated based on token usage
        },
      });
    }
    
    // Return the results
    return NextResponse.json({
      matchId: match.id,
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