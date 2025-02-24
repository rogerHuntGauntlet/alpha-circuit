// OpenAI Integration for Circuit Platform
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Types
type PlayerProfile = {
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

type GroupingRequest = {
  players: PlayerProfile[];
  groupSize: number;
  optimizationGoal: 'social' | 'skill' | 'balanced';
};

type PlayerGroup = {
  players: string[]; // Player IDs
  compatibilityScore: number;
  riskFactors: string[];
};

// Generate embeddings for player profiles
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

// Analyze voice for emotional state
export async function analyzeVoice(audioBuffer: Buffer): Promise<{
  emotions: Record<string, number>;
  toxicityScore: number;
  engagementLevel: number;
}> {
  try {
    // Step 1: Transcribe audio using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioBuffer,
      model: 'whisper-1',
    });

    // Step 2: Analyze the transcribed text for emotions and toxicity
    const analysisResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert voice analyzer for a gaming matchmaking platform. 
          Analyze the following transcribed speech for emotional states, toxicity, and engagement level.
          Return a JSON object with the following structure:
          {
            "emotions": {
              "happiness": 0-10 score,
              "anger": 0-10 score,
              "excitement": 0-10 score,
              "frustration": 0-10 score,
              "neutral": 0-10 score
            },
            "toxicityScore": 0-10 score,
            "engagementLevel": 0-10 score,
            "reasoning": "brief explanation of your analysis"
          }`
        },
        {
          role: 'user',
          content: transcription.text
        }
      ],
      response_format: { type: 'json_object' },
    });

    // Parse the response
    const analysis = JSON.parse(analysisResponse.choices[0].message.content as string);
    
    return {
      emotions: analysis.emotions,
      toxicityScore: analysis.toxicityScore,
      engagementLevel: analysis.engagementLevel
    };
  } catch (error) {
    console.error('Error analyzing voice:', error);
    throw new Error('Failed to analyze voice data');
  }
}

// Generate optimal player groupings
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

// Create personality profile from questionnaire responses
export async function analyzePersonality(responses: Record<string, string>): Promise<{
  traits: Record<string, number>;
  communicationStyle: string;
  recommendedGroupingFactors: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert personality analyzer for a gaming matchmaking platform.
          Analyze the following questionnaire responses and create a personality profile.
          Return a JSON object with personality traits scored from 0-10,
          communication style classification, and recommended grouping factors.`
        },
        {
          role: 'user',
          content: `Questionnaire responses:
          ${JSON.stringify(responses, null, 2)}`
        }
      ],
      response_format: { type: 'json_object' },
    });

    // Parse the response
    return JSON.parse(response.choices[0].message.content as string);
  } catch (error) {
    console.error('Error analyzing personality:', error);
    throw new Error('Failed to analyze personality data');
  }
}

// Evaluate match quality after gameplay
export async function evaluateMatchQuality(
  groups: PlayerGroup[], 
  feedback: Record<string, { rating: number; comments: string }>,
  voiceAnalysisResults: Record<string, any>
): Promise<{
  overallScore: number;
  insights: string[];
  recommendationsForFuture: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert match quality evaluator for a gaming matchmaking platform.
          Analyze the following match data including original groupings, player feedback, and voice analysis.
          Evaluate the overall match quality and provide insights and recommendations for future matches.`
        },
        {
          role: 'user',
          content: `
          Original groups:
          ${JSON.stringify(groups, null, 2)}
          
          Player feedback:
          ${JSON.stringify(feedback, null, 2)}
          
          Voice analysis results:
          ${JSON.stringify(voiceAnalysisResults, null, 2)}
          `
        }
      ],
      response_format: { type: 'json_object' },
    });

    // Parse the response
    return JSON.parse(response.choices[0].message.content as string);
  } catch (error) {
    console.error('Error evaluating match quality:', error);
    throw new Error('Failed to evaluate match quality');
  }
}

// Cache results to reduce API costs
const embeddingCache = new Map<string, number[]>();

// Helper function to get embeddings with caching
export async function getCachedEmbedding(profileId: string, profile: PlayerProfile): Promise<number[]> {
  if (embeddingCache.has(profileId)) {
    return embeddingCache.get(profileId)!;
  }
  
  const embedding = await generateProfileEmbedding(profile);
  embeddingCache.set(profileId, embedding);
  return embedding;
} 