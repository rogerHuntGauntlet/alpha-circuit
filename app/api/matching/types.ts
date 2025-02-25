// Define types for our API
export interface Player {
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

export interface MatchingRequest {
  apiKey: string;
  players: Player[];
  groupSize: number;
  optimizationGoal: 'social' | 'skill' | 'balanced';
}

export interface CompatibilityFactors {
  interests?: string;
  communicationStyle?: string;
  playTimes?: string;
  skillLevel?: string;
  [key: string]: string | undefined;
}

export interface Group {
  groupId: string;
  players: string[];
  compatibilityScore: number;
  commonInterests: string[];
  compatibilityFactors: CompatibilityFactors;
}

export interface MatchingResponse {
  groups: Group[];
  timestamp: string;
  quality: number;
} 