import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Player {
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
}

interface GroupGenerationParams {
  players: Player[];
  groupSize: number;
  optimizationGoal: 'social' | 'skill' | 'balanced';
}

export async function generatePlayerGroups({ players, groupSize, optimizationGoal }: GroupGenerationParams): Promise<Player[][]> {
  try {
    const prompt = generateMatchingPrompt(players, groupSize, optimizationGoal);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a gaming matchmaking expert that creates optimal player groups based on various factors."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    const result = JSON.parse(response);
    return result.groups;
  } catch (error) {
    console.error('Error generating player groups:', error);
    throw new Error('Failed to generate player groups');
  }
}

function generateMatchingPrompt(players: Player[], groupSize: number, optimizationGoal: string): string {
  const playerDetails = players.map(p => `
    Player ${p.id}:
    - Interests: ${p.interests.join(', ')}
    - Communication: ${p.communicationStyle}
    - Platform: ${p.platformPreference}
    - Play Times: ${p.playTimes.join(', ')}
    - Language: ${p.language}
    - Skill Level: ${p.skillLevel}/10
    - Content Tolerance: ${p.contentTolerance}/10
    - Theme Preference: ${p.themePreference}
    ${p.pastBehavior ? `- Past Behavior:
      * Toxicity Reports: ${p.pastBehavior.toxicityReports}
      * Friend Requests: ${p.pastBehavior.friendRequests}` : ''}
  `).join('\n');

  return `
    Create optimal player groups with the following parameters:
    - Group Size: ${groupSize}
    - Optimization Goal: ${optimizationGoal}
    
    Players:
    ${playerDetails}
    
    Please analyze these players and create balanced groups based on the optimization goal.
    Consider compatibility in terms of interests, communication styles, play times, and other factors.
    Return the groups as a JSON object with a "groups" array containing arrays of player objects.
    Each player object should maintain all their original properties.
  `;
} 