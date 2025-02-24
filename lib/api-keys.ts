import { createClient } from '@vercel/kv';
import { prisma } from './prisma';
import { randomUUID } from 'crypto';

const kv = createClient({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || ''
});

/**
 * Validate an API key
 */
export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    if (!apiKey.startsWith('circuit_')) {
      return false;
    }

    // Check if the API key exists and is active
    const key = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      select: { isActive: true }
    });

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
    
    // Create the API key in the database
    await prisma.apiKey.create({
      data: {
        key: newApiKey,
        userId,
        isActive: true
      }
    });
    
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
    return await prisma.apiKey.findMany({
      where: { 
        userId,
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error getting user API keys:', error);
    throw error;
  }
} 