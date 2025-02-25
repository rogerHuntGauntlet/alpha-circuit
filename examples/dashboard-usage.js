// Example of how users would use the matching API with keys from their dashboard
const fetch = require('node-fetch');

// Configuration
const API_URL = 'http://localhost:3002/api/matching';
const DASHBOARD_API_URL = 'http://localhost:3002/api/dashboard';

// Function to get a user's API key from the dashboard
const getDashboardApiKey = async (userId) => {
  console.log(`Fetching API key for user ${userId} from dashboard...`);
  
  try {
    const response = await fetch(`${DASHBOARD_API_URL}?userId=${userId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch API key');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching API key:', error.message);
    throw error;
  }
};

// Function to update API usage statistics
const updateApiUsage = async (userId, requestsUsed) => {
  console.log(`Updating API usage for user ${userId}...`);
  
  try {
    const response = await fetch(DASHBOARD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        requestsUsed
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update API usage');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating API usage:', error.message);
    throw error;
  }
};

// Example player data
const players = [
  {
    id: 'player1',
    interests: ['RPG', 'Strategy', 'FPS'],
    communicationStyle: 'casual',
    platformPreference: 'PC',
    playTimes: ['evening', 'weekend'],
    language: 'en',
    skillLevel: 7,
    contentTolerance: 8,
    themePreference: 'Action'
  },
  {
    id: 'player2',
    interests: ['RPG', 'MOBA', 'Strategy'],
    communicationStyle: 'competitive',
    platformPreference: 'PC',
    playTimes: ['evening', 'night'],
    language: 'en',
    skillLevel: 8,
    contentTolerance: 6,
    themePreference: 'Fantasy'
  },
  {
    id: 'player3',
    interests: ['FPS', 'Battle Royale', 'Racing'],
    communicationStyle: 'casual',
    platformPreference: 'Console',
    playTimes: ['weekend', 'night'],
    language: 'es',
    skillLevel: 5,
    contentTolerance: 9,
    themePreference: 'Sci-Fi'
  },
  {
    id: 'player4',
    interests: ['RPG', 'Strategy', 'Simulation'],
    communicationStyle: 'casual',
    platformPreference: 'PC',
    playTimes: ['evening', 'weekend'],
    language: 'en',
    skillLevel: 6,
    contentTolerance: 7,
    themePreference: 'Fantasy'
  }
];

// Function to make the API request using a key from the dashboard
async function matchPlayersWithDashboardKey() {
  try {
    // Step 1: Get the user's API key from the dashboard
    const userId = 'user123'; // This would be the logged-in user's ID
    const dashboardData = await getDashboardApiKey(userId);
    
    console.log(`Retrieved API key for user ${userId} from dashboard`);
    console.log(`Plan: ${dashboardData.plan}, Requests remaining: ${dashboardData.requestsRemaining}`);
    
    // Step 2: Use the API key to call the matching API
    console.log('\nCalling matching API with dashboard API key...');
    
    const payload = {
      apiKey: dashboardData.apiKey,
      players: players,
      groupSize: 2,
      optimizationGoal: 'balanced'
    };
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('API call successful!');
      console.log('Response:', JSON.stringify(data, null, 2));
      
      // Step 3: Update usage statistics
      const updatedData = await updateApiUsage(userId, 1);
      console.log('\nUpdated API usage statistics in dashboard');
      console.log(`Requests remaining: ${updatedData.requestsRemaining}`);
    } else {
      console.error('API call failed:', data.error);
    }
  } catch (error) {
    console.error('Error calling API:', error.message);
  }
}

// Example with non-existent user
async function simulateNonExistentUser() {
  try {
    console.log('\n--- Simulating non-existent user ---');
    
    // Try to get an API key for a non-existent user
    const userId = 'non-existent-user';
    await getDashboardApiKey(userId);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    console.log('User would be prompted to create an account or log in');
  }
}

// Run the examples
async function runDashboardExamples() {
  await matchPlayersWithDashboardKey();
  await simulateNonExistentUser();
}

runDashboardExamples(); 