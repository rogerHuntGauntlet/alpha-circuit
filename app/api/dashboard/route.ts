import { NextRequest, NextResponse } from 'next/server';
import { isValidApiKeyDev } from '../auth/keys';

// Define types for our API
interface UserApiKey {
  userId: string;
  apiKey: string; // This will be a masked version of the API key
  plan: string;
  requestsRemaining: number;
  lastLogin: string;
}

// Simulated user database with API keys
// In a real application, this would be stored in a database
// and the API keys would be properly hashed
const userApiKeys: Record<string, UserApiKey> = {
  'user123': {
    userId: 'user123',
    apiKey: 'gauntlet-api-key', // In production, we would not store the actual key
    plan: 'premium',
    requestsRemaining: 1000,
    lastLogin: new Date().toISOString()
  },
  'user456': {
    userId: 'user456',
    apiKey: 'dev-key-123',
    plan: 'basic',
    requestsRemaining: 500,
    lastLogin: new Date().toISOString()
  },
  'user789': {
    userId: 'user789',
    apiKey: 'prod-key-456',
    plan: 'enterprise',
    requestsRemaining: 5000,
    lastLogin: new Date().toISOString()
  }
};

// Function to mask an API key for display
function maskApiKey(apiKey: string): string {
  if (!apiKey || apiKey.length < 8) return '****';
  return apiKey.substring(0, 4) + '****' + apiKey.substring(apiKey.length - 4);
}

// API endpoint to get a user's API key
export async function GET(request: NextRequest) {
  try {
    // Get the user ID from the query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Check if the user ID is provided
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user ID' },
        { status: 400 }
      );
    }
    
    // Check if the user exists
    if (!userApiKeys[userId]) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create a safe version of the user data with masked API key
    const userData = { ...userApiKeys[userId] };
    
    // For development, we'll return the actual key
    // In production, we would return a masked version
    if (process.env.NODE_ENV === 'production') {
      userData.apiKey = maskApiKey(userData.apiKey);
    }
    
    // Return the user's API key information
    return NextResponse.json(userData);
    
  } catch (error: any) {
    console.error('Error retrieving API key:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// API endpoint to update a user's API usage
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Check if the user ID is provided
    if (!body.userId) {
      return NextResponse.json(
        { error: 'Missing user ID' },
        { status: 400 }
      );
    }
    
    // Check if the user exists
    if (!userApiKeys[body.userId]) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update the user's API usage
    if (body.requestsUsed && typeof body.requestsUsed === 'number') {
      userApiKeys[body.userId].requestsRemaining -= body.requestsUsed;
      
      // Ensure requests remaining doesn't go below 0
      if (userApiKeys[body.userId].requestsRemaining < 0) {
        userApiKeys[body.userId].requestsRemaining = 0;
      }
    }
    
    // Create a safe version of the user data with masked API key
    const userData = { ...userApiKeys[body.userId] };
    
    // For development, we'll return the actual key
    // In production, we would return a masked version
    if (process.env.NODE_ENV === 'production') {
      userData.apiKey = maskApiKey(userData.apiKey);
    }
    
    // Return the updated user information
    return NextResponse.json(userData);
    
  } catch (error: any) {
    console.error('Error updating API usage:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 