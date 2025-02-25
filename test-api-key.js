const fetch = require('node-fetch');

// Test data
const validApiKey = 'gauntlet-api-key';
const invalidApiKey = 'invalid-key';

const testPlayers = [
  {
    id: "player1",
    interests: ["RPG", "Strategy"],
    skillLevel: 7,
    language: "en"
  },
  {
    id: "player2",
    interests: ["RPG", "FPS"],
    skillLevel: 6,
    language: "en"
  }
];

// Function to test the API with a given API key
async function testApiWithKey(apiKey) {
  console.log(`Testing API with key: ${apiKey.substring(0, 4)}****`);
  
  const requestBody = {
    apiKey: apiKey,
    players: testPlayers,
    groupSize: 2,
    optimizationGoal: 'social'
  };
  
  try {
    const response = await fetch('http://localhost:3002/api/matching', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    const data = await response.json();
    
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return { status: response.status, data };
  } catch (error) {
    console.error('Error testing API:', error);
    return { status: 500, error: error.message };
  }
}

// Run the tests
async function runTests() {
  console.log('=== API Key Validation Test ===\n');
  
  console.log('1. Testing with valid API key:');
  const validResult = await testApiWithKey(validApiKey);
  
  console.log('\n2. Testing with invalid API key:');
  const invalidResult = await testApiWithKey(invalidApiKey);
  
  console.log('\n=== Test Results Summary ===');
  console.log(`Valid API key test: ${validResult.status === 200 ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log(`Invalid API key test: ${invalidResult.status === 403 ? 'PASSED ✅' : 'FAILED ❌'}`);
}

// Run the tests
runTests(); 