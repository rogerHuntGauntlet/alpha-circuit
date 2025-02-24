import { NextRequest, NextResponse } from 'next/server';
import { generatePlayerGroups, type GroupingRequest } from '@/lib/openai/index';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { validateApiKey } from '@/lib/api-keys';
import { rateLimit } from '@/lib/rate-limit';
import { trackApiUsage } from '@/lib/api-usage';
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
  const startTime = Date.now();
  
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
    
    // Get user ID either from session or API key
    let userId: string | null = null;
    
    if (session?.user) {
      userId = (session.user as any).id;
    } else {
      // API key validation for external clients
      const isValidKey = await validateApiKey(apiKey);
      if (!isValidKey) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }
      
      // Get user ID from API key
      const apiKeyRecord = await prisma.apiKey.findUnique({
        where: { key: apiKey },
        select: { userId: true }
      });
      
      if (!apiKeyRecord) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }
      
      userId = apiKeyRecord.userId;
      
      // Apply rate limiting to API clients
      try {
        await limiter.check(20, apiKey); // 20 requests per minute per API key
      } catch (error) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }
      
      // Track API usage
      trackApiUsage(request, apiKey, '/api/matching', startTime);
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
    
    // Calculate a quality score (this would be more sophisticated in a real app)
    const qualityScore = Math.floor(Math.random() * 30) + 70; // 70-99 quality score
    
    // Store the match in the database
    if (userId) {
      await prisma.match.create({
        data: {
          userId,
          playerCount: players.length,
          groupCount: Math.ceil(players.length / groupSize),
          optimizationType: optimizationGoal,
          status: 'completed',
          quality: qualityScore,
          completedAt: new Date(),
          matchData: playerGroups as any
        }
      });
    }
    
    // Return the results
    return NextResponse.json({
      groups: playerGroups,
      timestamp: new Date().toISOString(),
      quality: qualityScore
    });
  } catch (error: any) {
    console.error('Error processing matching request:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 