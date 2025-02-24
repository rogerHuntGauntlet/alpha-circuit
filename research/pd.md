# Circuit: Machine Learning Variables & Parameters

This document outlines the key variables and parameters used in Circuit's machine learning algorithms for player matching, as well as the integration with Vercel KV for user management.

## Implementation Status (February 2025)

### Core Matching Components
- ✅ Player profile data structures
- ✅ Basic matching algorithm (with OpenAI)
- ✅ Embedding generation for profiles
- ✅ Simple in-memory caching for API cost reduction

### User Management (Vercel KV)
- 🔄 User authentication system
- 🔄 API key management
- 🔄 Usage tracking implementation
- 🔄 Analytics dashboard development

## Architecture Approach
- **Hybrid System**: Combines stateless matching with persistent user management
- **Matching Core**: Stateless request-response processing with OpenAI
- **User Management**: Persistent storage with Vercel KV
- **Dashboard Interface**: For API key management and analytics

## Player Matching Process

### Request Processing
- Client sends player profiles and matching parameters with API key
- System validates API key against Vercel KV
- If valid, API prepares optimized prompt for OpenAI
- Response is formatted and returned to client
- Usage metrics are updated in Vercel KV
- **Implementation**: ✅ Basic flow implemented, 🔄 API key validation in progress

## Key Machine Learning Variables

### Player Attributes Used for Matching
- **Theme Preferences**: Action - Neutral - Soothing
  - **Implementation**: ✅ Included in profile data structure
- **Interests**: Shared interests optimization
  - **Implementation**: ✅ Basic matching implemented
- **Platform Preferences**: Mobile/PC/Console grouping
  - **Implementation**: ✅ Included in matching algorithm
- **Language Compatibility**: Primary language matching
  - **Implementation**: ✅ Included in profile data structure
- **Skill Level**: Beginner - Intermediate - Expert
  - **Implementation**: ✅ Basic skill matching implemented
- **Communication Style**: Quiet - Balanced - Chatty
  - **Implementation**: ✅ Included in matching algorithm
- **Content Tolerance**: Family-friendly - Moderate - Mature
  - **Implementation**: ✅ Included in profile data structure
- **Availability**: Time windows for play sessions
  - **Implementation**: ✅ Basic time overlap calculation implemented

## OpenAI Integration

### Current Approach
- Using `text-embedding-3-small` for profile embeddings (1536 dimensions)
- Using `gpt-4-turbo` for advanced matching and analysis
- Implementing simple caching to reduce API costs
- Optimizing prompts for consistent response formats

### Example Usage
```typescript
// Generate embeddings for player profiles
const embedding = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: profileText,
  dimensions: 1536,
});

// Generate optimal player groupings
const response = await openai.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [
    {
      role: 'system',
      content: 'You are an expert gaming matchmaking algorithm...'
    },
    {
      role: 'user',
      content: `Please create optimal groups with these parameters:...`
    }
  ],
  response_format: { type: 'json_object' },
});
```

## Vercel KV Integration

### Data Structures

```typescript
// User data structure
interface User {
  id: string;          // UUID
  email: string;       // User email
  passwordHash: string; // Hashed password
  createdAt: number;   // Timestamp
  role: string;        // User role (user/admin)
}

// API key data structure
interface ApiKey {
  key: string;         // The API key itself
  userId: string;      // Associated user ID
  name: string;        // User-defined name for the key
  createdAt: number;   // Timestamp
  lastUsed: number;    // Last usage timestamp
  isActive: boolean;   // Whether key is active
  type: string;        // Key type (test/live)
}

// Usage metrics structure
interface UsageMetrics {
  userId: string;       // User ID
  month: string;        // YYYY-MM format
  requestCount: number; // Number of requests
  tokensUsed: number;   // Number of OpenAI tokens used
  matchesCreated: number; // Number of match groups created
}
```

### Key-Value Patterns

- Users: `user:{id}` → User object
- Email lookup: `email:{email}` → User ID
- API keys: `apikey:{key}` → API key object
- User's keys: `userkeys:{userId}` → Array of key IDs
- Monthly usage: `usage:{userId}:{YYYY-MM}` → Usage metrics

## Matching Optimization Goals

These are the primary factors our algorithm considers when creating player groups:

### Social Optimization
- Maximizes interest overlap
- Prioritizes communication style compatibility
- Groups players with similar content preferences
- Ensures language compatibility

### Skill Optimization
- Creates balanced teams with similar skill levels
- Avoids placing all experts or all beginners together
- Distributes players to create fair competition
- Considers experience in specific game types

### Balanced Optimization
- Combines elements of both social and skill optimization
- Ensures basic compatibility while maintaining competitive balance
- Default optimization method when no specific goal is provided

## Fallback Algorithm

When OpenAI API is unavailable or for high-volume requests:

```typescript
// Simplified compatibility calculation
function calculateCompatibility(player1, player2) {
  let score = 0;
  
  // Interest overlap (up to 30 points)
  const interestOverlap = player1.interests.filter(i => 
    player2.interests.includes(i)).length;
  score += Math.min(30, interestOverlap * 10);
  
  // Language match (up to 25 points)
  if (player1.language === player2.language) {
    score += 25;
  }
  
  // Platform preference (up to 15 points)
  if (player1.platformPreference === player2.platformPreference) {
    score += 15;
  }
  
  // Skill level compatibility (up to 15 points)
  const skillGap = Math.abs(
    skillLevels.indexOf(player1.skillLevel) - 
    skillLevels.indexOf(player2.skillLevel)
  );
  score += 15 - (skillGap * 7.5);
  
  // Communication style (up to 15 points)
  const commStyles = ['quiet', 'balanced', 'chatty'];
  const commGap = Math.abs(
    commStyles.indexOf(player1.communicationStyle) - 
    commStyles.indexOf(player2.communicationStyle)
  );
  score += 15 - (commGap * 7.5);
  
  return Math.min(100, score);
}
```

## Performance Considerations

### API Cost Optimization
- Simple in-memory caching for frequent similar requests
- Optimized prompt design to minimize token usage
- Fallback algorithm for high-volume scenarios
- Usage tracking for cost monitoring and control

### Response Time
- Current target: <1000ms for matching requests
- Current average: ~1500ms for complex matching
- Optimization in progress to reduce latency

### Usage Metrics Tracked
- **Request Count**: Total API calls made
- **Token Usage**: OpenAI tokens consumed
- **Match Groups**: Number of groups generated
- **Response Time**: Average response latency
- **Fallback Usage**: When fallback algorithm is triggered

## Next Steps

1. Complete Vercel KV integration for user management
2. Implement API key validation for matching requests
3. Build usage tracking middleware
4. Refine OpenAI prompts for more accurate matching
5. Develop analytics dashboard for usage monitoring


