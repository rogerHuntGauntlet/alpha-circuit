import { createClient } from '@vercel/kv';
import { kv } from './prisma';
import { randomUUID } from 'crypto';

// Define types for our KV data structures
interface ApiKey {
  id: string;
  key: string;
  userId: string;
  isActive: boolean;
  createdAt: number;
  lastUsed?: number;
}

/**
 * Validate an API key
 */
export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    if (!apiKey.startsWith('circuit_')) {
      return false;
    }

    // Check if the API key exists and is active
    const key = await kv.get(`apikey:${apiKey}`) as ApiKey | null;
    return key?.isActive === true;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
}

/**
 * Generate a new API key for a user
 */
export async function generateApiKey(userId: string): Promise<string> {
  try {
    // Generate a new API key
    const newApiKey = `circuit_${randomUUID().replace(/-/g, '')}`;
    const apiKeyId = randomUUID();
    
    const apiKeyData: ApiKey = {
      id: apiKeyId,
      key: newApiKey,
      userId,
      isActive: true,
      createdAt: Date.now()
    };
    
    // Store the API key in KV
    await kv.set(`apikey:${newApiKey}`, apiKeyData);
    
    // Add to user's API keys list
    await kv.lpush(`user:${userId}:apikeys`, `apikey:${newApiKey}`);
    
    return newApiKey;
  } catch (error) {
    console.error('Error generating API key:', error);
    throw error;
  }
}

/**
 * Get a user's active API keys
 */
export async function getUserApiKeys(userId: string) {
  try {
    // Get the list of API key references for this user
    const apiKeyRefs = await kv.lrange(`user:${userId}:apikeys`, 0, -1) || [];
    
    // Fetch all API keys
    const apiKeyPromises = apiKeyRefs.map(ref => kv.get(ref));
    const apiKeysRaw = await Promise.all(apiKeyPromises);
    
    // Filter for active keys and sort by creation date (newest first)
    const apiKeys = apiKeysRaw
      .filter((key): key is ApiKey => 
        key !== null && 
        typeof key === 'object' && 
        'isActive' in key && 
        key.isActive === true
      )
      .sort((a, b) => b.createdAt - a.createdAt);
      
    return apiKeys;
  } catch (error) {
    console.error('Error getting user API keys:', error);
    throw error;
  }
} 