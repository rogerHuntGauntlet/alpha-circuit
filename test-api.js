// Simple script to test the matching API endpoint
const fetch = require('node-fetch');

async function testMatchingAPI() {
  try {
    console.log('Sending request to API...');
    
    const requestBody = {
      apiKey: 'test-key',
      players: [
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
          themePreference: 'Action'
        }
      ],
      groupSize: 2,
      optimizationGoal: 'balanced'
    };
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch('http://localhost:3002/api/matching', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log('Response status:', response.status);
    
    const text = await response.text();
    console.log('Raw response:', text);
    
    try {
      const data = JSON.parse(text);
      console.log('API Response (parsed):');
      console.log(JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
    }
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testMatchingAPI(); 