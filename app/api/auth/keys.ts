// Valid API keys for the matching API
// In a production environment, these would be stored in a database or environment variables
// IMPORTANT: We're using a simple hashing approach for this example
// In a real production environment, you would use a more secure method like JWT or OAuth

import crypto from 'crypto';

// Hashed API keys (instead of storing plain text)
// These are SHA-256 hashes of the original keys
const HASHED_API_KEYS = [
  '93255624eb7b1766f8a58cc6c6b01d61adf8bb484ce18115bfc5c9d62b919cc4', // test-key
  '91d1504bb460475b03fb31a24bb8decc8cf9e47d953d18569e68165bcb0704e1', // dev-key-123
  'a78dd95e4346d3ecbf73827059b326255ca922133550b7057285ce48dd1ca508', // prod-key-456
  '9ed317969edfc7b24a235ccefae83f5f7ba65d80d301ad2144465ce852969ead'  // gauntlet-api-key
];

// Function to hash an API key
function hashApiKey(apiKey: string): string {
  return crypto
    .createHash('sha256')
    .update(apiKey + process.env.API_KEY_SALT || 'default-salt')
    .digest('hex');
}

// Function to validate an API key
export function isValidApiKey(apiKey: string): boolean {
  // Hash the provided API key
  const hashedKey = hashApiKey(apiKey);
  
  // Check if the hashed key exists in our list of valid hashed keys
  return HASHED_API_KEYS.includes(hashedKey);
}

// For development/testing purposes only - DO NOT USE IN PRODUCTION
// This allows us to still use our test keys during development
export function isValidApiKeyDev(apiKey: string): boolean {
  const devKeys = ['test-key', 'dev-key-123', 'prod-key-456', 'gauntlet-api-key'];
  return devKeys.includes(apiKey);
} 