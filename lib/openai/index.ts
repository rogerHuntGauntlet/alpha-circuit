// OpenAI Integration for Circuit Platform
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Types
export type PlayerProfile = {
  id: string;
  interests: string[];
  communicationStyle: string;
  platformPreference: string;
  playTimes: string[];
  language: string;
  skillLevel: number;
  contentTolerance: number;
  themePreference: 'Action' | 'Neutral' | 'Soothing';
  pastBehavior?: {
    toxicityReports: number;
    friendRequests: number;
  };
};

export type GroupingRequest = {
  players: PlayerProfile[];
  groupSize: number;
  optimizationGoal: 'social' | 'skill' | 'balanced';
};

export type PlayerGroup = {
  players: string[]; // Player IDs
  compatibilityScore: number;
  riskFactors: string[];
};

/**
 * Generate embeddings for player profiles
 * 
 * These embeddings can be used for similarity matching between players.
 */
export async function generateProfileEmbedding(profile: PlayerProfile): Promise<number[]> {
  try {
    // Create a text representation of the profile
    const profileText = `
      Interests: ${profile.interests.join(', ')}
      Communication Style: ${profile.communicationStyle}
      Platform: ${profile.platformPreference}
      Play Times: ${profile.playTimes.join(', ')}
      Language: ${profile.language}
      Skill Level: ${profile.skillLevel}/10
      Content Tolerance: ${profile.contentTolerance}/10
      Theme Preference: ${profile.themePreference}
      ${profile.pastBehavior ? `Toxicity Reports: ${profile.pastBehavior.toxicityReports}` : ''}
      ${profile.pastBehavior ? `Friend Requests: ${profile.pastBehavior.friendRequests}` : ''}
    `;

    // Generate embedding
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: profileText,
      dimensions: 1536,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating profile embedding:', error);
    throw new Error('Failed to generate profile embedding');
  }
}

/**
 * Generate optimal player groupings
 * 
 * Uses OpenAI to create optimized groups based on player profiles
 * and the specified optimization goal.
 */
export async function generatePlayerGroups(request: GroupingRequest): Promise<PlayerGroup[]> {
  try {
    // Extract player profiles for better prompt context
    const simplifiedPlayers = request.players.map(p => ({
      id: p.id,
      interests: p.interests,
      communicationStyle: p.communicationStyle,
      platformPreference: p.platformPreference,
      language: p.language,
      skillLevel: p.skillLevel,
      themePreference: p.themePreference,
      toxicityReports: p.pastBehavior?.toxicityReports || 0
    }));

    // Create a prompt for the OpenAI completion
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert gaming matchmaking algorithm. Your task is to form optimal groups of players
          based on their profiles and the requested optimization goal.
          
          Optimization Goals:
          - 'social': Maximize social compatibility and minimize toxicity risk
          - 'skill': Create balanced teams in terms of skill level
          - 'balanced': Balance both social and skill factors
          
          For each group, provide:
          1. The player IDs in the group
          2. A compatibility score (0-100)
          3. Any risk factors to be aware of
          
          Return your answer as a JSON array of groups.`
        },
        {
          role: 'user',
          content: `Please create optimal groups with these parameters:
          - Group size: ${request.groupSize}
          - Optimization goal: ${request.optimizationGoal}
          - Number of players: ${request.players.length}
          
          Player profiles:
          ${JSON.stringify(simplifiedPlayers, null, 2)}`
        }
      ],
      response_format: { type: 'json_object' },
    });

    // Parse the response
    const groups = JSON.parse(response.choices[0].message.content as string);
    
    return groups.groups;
  } catch (error) {
    console.error('Error generating player groups:', error);
    throw new Error('Failed to generate player groups');
  }
}

// Cache results to reduce API costs
const embeddingCache = new Map<string, number[]>();

/**
 * Get cached embedding or generate a new one
 * 
 * Helps reduce API costs by caching previously generated embeddings.
 */
export async function getCachedEmbedding(profileId: string, profile: PlayerProfile): Promise<number[]> {
  if (embeddingCache.has(profileId)) {
    return embeddingCache.get(profileId)!;
  }
  
  const embedding = await generateProfileEmbedding(profile);
  embeddingCache.set(profileId, embedding);
  return embedding;
}

export default {
  generateProfileEmbedding,
  generatePlayerGroups,
  getCachedEmbedding
}; 