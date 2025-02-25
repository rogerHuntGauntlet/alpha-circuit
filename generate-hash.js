const crypto = require('crypto');

// Function to hash an API key
function hashApiKey(apiKey) {
  return crypto
    .createHash('sha256')
    .update(apiKey + 'default-salt')
    .digest('hex');
}

// Generate hash for our test key
const apiKey = 'gauntlet-api-key';
const hashedKey = hashApiKey(apiKey);

console.log(`API Key: ${apiKey}`);
console.log(`Hashed Key: ${hashedKey}`);

// Also generate hashes for other keys
const otherKeys = ['test-key', 'dev-key-123', 'prod-key-456'];
otherKeys.forEach(key => {
  console.log(`\nAPI Key: ${key}`);
  console.log(`Hashed Key: ${hashApiKey(key)}`);
}); 