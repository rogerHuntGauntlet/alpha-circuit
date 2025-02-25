// Example of how to use the matching API with authentication
const fetch = require('node-fetch');

// Configuration
const API_URL = 'http://localhost:3002/api/matching';
const API_KEY = 'test-key'; // Use one of the valid API keys

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

// Example request payload
const payload = {
  apiKey: API_KEY,
  players: players,
  groupSize: 2,
  optimizationGoal: 'balanced'
};

// Function to make the API request
async function callMatchingAPI() {
  try {
    console.log('Calling matching API with valid API key...');
    
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
    } else {
      console.error('API call failed:', data.error);
    }
  } catch (error) {
    console.error('Error calling API:', error.message);
  }
}

// Example with invalid API key
async function callWithInvalidKey() {
  try {
    console.log('\nCalling matching API with invalid API key...');
    
    const invalidPayload = {
      ...payload,
      apiKey: 'invalid-key'
    };
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidPayload)
    });
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error calling API:', error.message);
  }
}

// Run the examples
async function runExamples() {
  await callMatchingAPI();
  await callWithInvalidKey();
}

runExamples(); 