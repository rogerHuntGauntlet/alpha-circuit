// Example of secure API key management for the matching API
const fetch = require('node-fetch');
const crypto = require('crypto');

// Configuration
const API_URL = 'http://localhost:3002/api/matching';
const DASHBOARD_API_URL = 'http://localhost:3002/api/dashboard';

// Function to generate a secure API key
function generateSecureApiKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Function to securely store an API key (in a real app, this would use a secure storage method)
function securelyStoreApiKey(userId, apiKey) {
  console.log(`Securely storing API key for user ${userId}`);
  console.log(`Key: ${maskApiKey(apiKey)}`);
  
  // In a real application, you would:
  // 1. Never store the plain text key in client-side code
  // 2. Use a secure storage method like browser's localStorage with encryption
  // 3. Only store the key temporarily while the user is using the application
  
  // For this example, we'll just store it in memory
  localStorage.setItem(`apiKey_${userId}`, apiKey);
  
  console.log('API key securely stored');
}

// Function to retrieve a securely stored API key
function getSecurelyStoredApiKey(userId) {
  console.log(`Retrieving securely stored API key for user ${userId}`);
  
  // In a real application, you would decrypt the key from secure storage
  const apiKey = localStorage.getItem(`apiKey_${userId}`);
  
  if (!apiKey) {
    console.log('No API key found, user needs to log in');
    return null;
  }
  
  console.log(`Retrieved key: ${maskApiKey(apiKey)}`);
  return apiKey;
}

// Function to mask an API key for display
function maskApiKey(apiKey) {
  if (!apiKey || apiKey.length < 8) return '****';
  return apiKey.substring(0, 4) + '****' + apiKey.substring(apiKey.length - 4);
}

// Function to get a user's API key from the dashboard
const getDashboardApiKey = async (userId) => {
  console.log(`Fetching API key for user ${userId} from dashboard...`);
  
  try {
    const response = await fetch(`${DASHBOARD_API_URL}?userId=${userId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch API key');
    }
    
    const userData = await response.json();
    
    // Securely store the API key
    securelyStoreApiKey(userId, userData.apiKey);
    
    return userData;
  } catch (error) {
    console.error('Error fetching API key:', error.message);
    throw error;
  }
};

// Example player data
const players = [
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
];

// Function to make a secure API request
async function makeSecureApiRequest(userId) {
  try {
    console.log('Making secure API request...');
    
    // Get the API key (either from secure storage or from the dashboard)
    let apiKey = getSecurelyStoredApiKey(userId);
    
    if (!apiKey) {
      // If we don't have the key stored, get it from the dashboard
      const userData = await getDashboardApiKey(userId);
      apiKey = userData.apiKey;
    }
    
    // Make the API request with the securely retrieved key
    const payload = {
      apiKey: apiKey,
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
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API request failed');
    }
    
    const data = await response.json();
    console.log('API request successful!');
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    console.error('Error making secure API request:', error.message);
    throw error;
  }
}

// Example of key rotation (best practice for security)
async function rotateApiKey(userId) {
  console.log(`Rotating API key for user ${userId}...`);
  
  try {
    // In a real application, you would:
    // 1. Generate a new API key
    // 2. Update it in the backend
    // 3. Update it in secure storage
    
    // For this example, we'll just simulate the process
    const newApiKey = generateSecureApiKey();
    console.log(`Generated new API key: ${maskApiKey(newApiKey)}`);
    
    // Simulate updating the key in the backend
    console.log('Updating API key in backend...');
    
    // Store the new key securely
    securelyStoreApiKey(userId, newApiKey);
    
    console.log('API key rotated successfully');
    
    return { success: true, message: 'API key rotated successfully' };
  } catch (error) {
    console.error('Error rotating API key:', error.message);
    throw error;
  }
}

// Run the examples
async function runSecureExamples() {
  try {
    const userId = 'user123';
    
    // Example 1: Generate a secure API key
    console.log('\n--- Example 1: Generate a secure API key ---');
    const secureKey = generateSecureApiKey();
    console.log(`Generated secure API key: ${maskApiKey(secureKey)}`);
    
    // Example 2: Make a secure API request
    console.log('\n--- Example 2: Make a secure API request ---');
    await makeSecureApiRequest(userId);
    
    // Example 3: Rotate API key (security best practice)
    console.log('\n--- Example 3: Rotate API key ---');
    await rotateApiKey(userId);
    
  } catch (error) {
    console.error('Error in secure examples:', error.message);
  }
}

// Mock localStorage for Node.js environment
if (typeof localStorage === 'undefined') {
  global.localStorage = {
    _data: {},
    setItem: function(id, val) { this._data[id] = val; },
    getItem: function(id) { return this._data[id] || null; },
    removeItem: function(id) { delete this._data[id]; },
    clear: function() { this._data = {}; }
  };
}

// Run the examples
runSecureExamples(); 