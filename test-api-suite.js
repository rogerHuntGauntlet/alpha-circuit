// Comprehensive test suite for the matching API
const fetch = require('node-fetch');

// Configuration
const API_URL = 'http://localhost:3002/api/matching';
const API_KEY = 'test-key';

// Test cases
const testCases = [
  {
    name: 'Basic matching with 2 players',
    payload: {
      apiKey: API_KEY,
      players: [
        {
          id: 'player1',
          interests: ['RPG', 'Strategy'],
          skillLevel: 7
        },
        {
          id: 'player2',
          interests: ['RPG', 'MOBA'],
          skillLevel: 8
        }
      ],
      groupSize: 2,
      optimizationGoal: 'balanced'
    },
    validate: (response) => {
      if (!response.groups || !Array.isArray(response.groups) || response.groups.length !== 1) {
        return { success: false, message: 'Expected 1 group in response' };
      }
      
      const group = response.groups[0];
      if (!group.players || !Array.isArray(group.players) || group.players.length !== 2) {
        return { success: false, message: 'Expected 2 players in group' };
      }
      
      if (typeof group.compatibilityScore !== 'number') {
        return { success: false, message: 'Expected compatibilityScore to be a number' };
      }
      
      return { success: true };
    }
  },
  {
    name: 'Matching with 4 players into groups of 2',
    payload: {
      apiKey: API_KEY,
      players: [
        {
          id: 'player1',
          interests: ['RPG', 'Strategy', 'FPS'],
          communicationStyle: 'casual',
          platformPreference: 'PC',
          playTimes: ['evening', 'weekend'],
          language: 'en',
          skillLevel: 7
        },
        {
          id: 'player2',
          interests: ['RPG', 'MOBA', 'Strategy'],
          communicationStyle: 'competitive',
          platformPreference: 'PC',
          playTimes: ['evening', 'night'],
          language: 'en',
          skillLevel: 8
        },
        {
          id: 'player3',
          interests: ['FPS', 'Battle Royale', 'Racing'],
          communicationStyle: 'casual',
          platformPreference: 'Console',
          playTimes: ['weekend', 'night'],
          language: 'es',
          skillLevel: 5
        },
        {
          id: 'player4',
          interests: ['RPG', 'Strategy', 'Simulation'],
          communicationStyle: 'casual',
          platformPreference: 'PC',
          playTimes: ['evening', 'weekend'],
          language: 'en',
          skillLevel: 6
        }
      ],
      groupSize: 2,
      optimizationGoal: 'balanced'
    },
    validate: (response) => {
      if (!response.groups || !Array.isArray(response.groups) || response.groups.length !== 2) {
        return { success: false, message: 'Expected 2 groups in response' };
      }
      
      for (const group of response.groups) {
        if (!group.players || !Array.isArray(group.players) || group.players.length !== 2) {
          return { success: false, message: 'Expected 2 players in each group' };
        }
      }
      
      return { success: true };
    }
  },
  {
    name: 'Matching with 5 players into groups of 2 (uneven)',
    payload: {
      apiKey: API_KEY,
      players: [
        { id: 'player1', interests: ['RPG'], skillLevel: 7 },
        { id: 'player2', interests: ['RPG'], skillLevel: 8 },
        { id: 'player3', interests: ['FPS'], skillLevel: 5 },
        { id: 'player4', interests: ['RPG'], skillLevel: 6 },
        { id: 'player5', interests: ['Strategy'], skillLevel: 4 }
      ],
      groupSize: 2,
      optimizationGoal: 'balanced'
    },
    validate: (response) => {
      if (!response.groups || !Array.isArray(response.groups) || response.groups.length !== 3) {
        return { success: false, message: 'Expected 3 groups in response' };
      }
      
      // First two groups should have 2 players, last group should have 1
      if (response.groups[0].players.length !== 2 || 
          response.groups[1].players.length !== 2 || 
          response.groups[2].players.length !== 1) {
        return { success: false, message: 'Expected 2 players in first two groups and 1 in last group' };
      }
      
      return { success: true };
    }
  },
  {
    name: 'Social optimization goal',
    payload: {
      apiKey: API_KEY,
      players: [
        { id: 'player1', interests: ['RPG', 'Strategy'], skillLevel: 7 },
        { id: 'player2', interests: ['RPG', 'MOBA'], skillLevel: 8 },
        { id: 'player3', interests: ['FPS', 'Battle Royale'], skillLevel: 5 },
        { id: 'player4', interests: ['RPG', 'Strategy'], skillLevel: 6 }
      ],
      groupSize: 2,
      optimizationGoal: 'social'
    },
    validate: (response) => {
      if (!response.groups || !Array.isArray(response.groups) || response.groups.length !== 2) {
        return { success: false, message: 'Expected 2 groups in response' };
      }
      
      return { success: true };
    }
  },
  {
    name: 'Skill optimization goal',
    payload: {
      apiKey: API_KEY,
      players: [
        { id: 'player1', interests: ['RPG'], skillLevel: 7 },
        { id: 'player2', interests: ['RPG'], skillLevel: 8 },
        { id: 'player3', interests: ['FPS'], skillLevel: 5 },
        { id: 'player4', interests: ['RPG'], skillLevel: 6 }
      ],
      groupSize: 2,
      optimizationGoal: 'skill'
    },
    validate: (response) => {
      if (!response.groups || !Array.isArray(response.groups) || response.groups.length !== 2) {
        return { success: false, message: 'Expected 2 groups in response' };
      }
      
      return { success: true };
    }
  },
  {
    name: 'Missing API key',
    payload: {
      players: [
        { id: 'player1', interests: ['RPG'], skillLevel: 7 },
        { id: 'player2', interests: ['RPG'], skillLevel: 8 }
      ],
      groupSize: 2,
      optimizationGoal: 'balanced'
    },
    expectedStatus: 401,
    validate: (response) => {
      if (!response.error || response.error !== 'Missing API key') {
        return { success: false, message: 'Expected error message about missing API key' };
      }
      
      return { success: true };
    }
  },
  {
    name: 'Invalid API key',
    payload: {
      apiKey: 'invalid-key',
      players: [
        { id: 'player1', interests: ['RPG'], skillLevel: 7 },
        { id: 'player2', interests: ['RPG'], skillLevel: 8 }
      ],
      groupSize: 2,
      optimizationGoal: 'balanced'
    },
    expectedStatus: 403,
    validate: (response) => {
      if (!response.error || response.error !== 'Invalid API key') {
        return { success: false, message: 'Expected error message about invalid API key' };
      }
      
      return { success: true };
    }
  },
  {
    name: 'Invalid group size',
    payload: {
      apiKey: API_KEY,
      players: [
        { id: 'player1', interests: ['RPG'], skillLevel: 7 },
        { id: 'player2', interests: ['RPG'], skillLevel: 8 }
      ],
      groupSize: 0,
      optimizationGoal: 'balanced'
    },
    expectedStatus: 400,
    validate: (response) => {
      if (!response.error || !response.error.includes('groupSize')) {
        return { success: false, message: 'Expected error message about invalid group size' };
      }
      
      return { success: true };
    }
  },
  {
    name: 'Invalid optimization goal',
    payload: {
      apiKey: API_KEY,
      players: [
        { id: 'player1', interests: ['RPG'], skillLevel: 7 },
        { id: 'player2', interests: ['RPG'], skillLevel: 8 }
      ],
      groupSize: 2,
      optimizationGoal: 'invalid'
    },
    expectedStatus: 400,
    validate: (response) => {
      if (!response.error || !response.error.includes('optimizationGoal')) {
        return { success: false, message: 'Expected error message about invalid optimization goal' };
      }
      
      return { success: true };
    }
  },
  {
    name: 'Stress test with 20 players',
    payload: {
      apiKey: API_KEY,
      players: Array.from({ length: 20 }, (_, i) => ({
        id: `player${i + 1}`,
        interests: ['RPG', 'Strategy', 'FPS'].slice(0, Math.floor(Math.random() * 3) + 1),
        skillLevel: Math.floor(Math.random() * 10) + 1
      })),
      groupSize: 4,
      optimizationGoal: 'balanced'
    },
    validate: (response) => {
      if (!response.groups || !Array.isArray(response.groups) || response.groups.length !== 5) {
        return { success: false, message: `Expected 5 groups in response, got ${response.groups?.length}` };
      }
      
      return { success: true };
    }
  }
];

// Run all tests
async function runTests() {
  console.log('Starting API test suite...');
  console.log('='.repeat(50));
  
  let passedTests = 0;
  let failedTests = 0;
  
  for (const testCase of testCases) {
    try {
      console.log(`Running test: ${testCase.name}`);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.payload)
      });
      
      const expectedStatus = testCase.expectedStatus || 200;
      if (response.status !== expectedStatus) {
        console.log(`❌ FAILED: Expected status ${expectedStatus}, got ${response.status}`);
        failedTests++;
        continue;
      }
      
      const data = await response.json();
      
      const validationResult = testCase.validate(data);
      if (!validationResult.success) {
        console.log(`❌ FAILED: ${validationResult.message}`);
        console.log('Response:', JSON.stringify(data, null, 2));
        failedTests++;
        continue;
      }
      
      console.log(`✅ PASSED`);
      passedTests++;
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
      failedTests++;
    }
    
    console.log('-'.repeat(50));
  }
  
  console.log('='.repeat(50));
  console.log(`Test Results: ${passedTests} passed, ${failedTests} failed`);
  console.log(`Success Rate: ${Math.round((passedTests / testCases.length) * 100)}%`);
}

// Run the tests
runTests(); 