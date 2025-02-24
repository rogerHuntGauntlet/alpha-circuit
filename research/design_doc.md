# Circuit - Intelligent Gaming Matchmaking Platform

## Design Document

### Executive Summary
Circuit is a hybrid matching platform that helps gaming companies enhance player experiences through intelligent social matching. The platform provides a user management system with API key generation and usage analytics, coupled with a powerful stateless matching service powered by OpenAI.

### Implementation Status (February 2025)
- ✅ Core technical architecture defined
- ✅ OpenAI integration implemented
- ✅ Matching algorithms developed
- ✅ API structure designed
- ✅ Dashboard UI prototyped
- 🔄 Vercel KV integration in progress
- 🔄 Authentication system in development
- 🔄 API key management in development

### Problem Statement
Modern gaming faces a critical challenge: poor social experiences due to mismatched player personalities and preferences, leading to reduced player retention and satisfaction.

### Solution Overview
Circuit provides a comprehensive platform that combines:
1. **User Management System**: For account creation, API key generation, and usage tracking
2. **Stateless Matching API**: For optimizing player groups based on compatibility factors
3. **Analytics Dashboard**: For monitoring usage and performance metrics

#### Core Features

1. **User Management**
   - User registration and authentication
   - API key generation and management
   - Usage monitoring and analytics
   - **Status**: 🔄 In development using NextAuth.js and Vercel KV

2. **Player Compatibility Analysis**
   - Processes player profile data
   - Analyzes compatibility factors
   - Generates optimized groupings
   - **Status**: ✅ Core functionality implemented

3. **Intelligent Matching Algorithms**
   - Primary Matching Factors:
     - Interest alignment
     - Platform preferences
     - Language compatibility
     - Communication style
     - Content tolerance levels
     - Skill level
     - Theme preferences
     - Time availability
     - **Status**: ✅ Core algorithm implemented, 🔄 Optimization ongoing

4. **Developer-Focused Dashboard**
   - API key management interface
   - Usage statistics and analytics
   - Documentation and examples
   - **Status**: 🔄 UI prototype developed, functionality in progress

### Technical Architecture

#### Hybrid Architecture Approach
Circuit uses a hybrid architecture that combines:
- **Stateless Core**: The matching algorithm operates statelessly (request → OpenAI → response)
- **Persistent Storage**: User accounts, API keys, and usage metrics stored in Vercel KV
- **Web Interface**: Dashboard for account management, key generation, and analytics

#### Data Flow

```
┌─────────────┐         ┌───────────────┐         ┌─────────────┐
│  Client     │         │  Circuit API  │         │  OpenAI API │
│  Application│─────────►               │─────────►             │
└─────────────┘         │               │         └─────────────┘
      ▲                 │               │               │
      │                 │               │◄──────────────┘
      │                 └───────┬───────┘
      │                         │
      └─────────────────────────┘
                                │
                                ▼
                        ┌───────────────┐
                        │   Vercel KV   │
                        │ (User Data &  │
                        │   Metrics)    │
                        └───────────────┘
```

#### API Structure
1. **Authentication Endpoints**
   - `POST /api/auth/register` - Create new account
   - `POST /api/auth/login` - Authenticate user
   - **Status**: 🔄 In development

2. **API Key Management**
   - `POST /api/keys/create` - Generate new API key
   - `GET /api/keys/list` - List user's API keys
   - `DELETE /api/keys/:id` - Revoke API key
   - **Status**: 🔄 In development

3. **Matching Service**
   - `POST /api/matching` - Create match groups
   - **Status**: ✅ Implemented

#### Machine Learning Components
1. **Profile Analysis**
   - Embedding generation for profiles
   - Compatibility scoring
   - **Status**: ✅ OpenAI integration implemented

2. **Group Formation**
   - Team composition optimization
   - Compatibility-based grouping
   - Risk factor identification
   - **Status**: ✅ Basic model implemented, using OpenAI for advanced matching

### Technology Stack

Based on our research and development to date, we have selected the following technology stack:

1. **Frontend**
   - Next.js 14 with App Router for server-side rendering
   - Tailwind CSS for styling
   - TypeScript for type safety

2. **Backend**
   - Next.js API routes for serverless functions
   - NextAuth.js for authentication
   - Vercel KV (Redis) for user data and metrics
   - TypeScript for type safety
   - Zod for request validation

3. **AI & Machine Learning**
   - OpenAI API for core ML functionality
   - text-embedding-3-small for profile embeddings
   - GPT-4 Turbo for advanced matching and analysis

4. **Deployment**
   - Vercel for hosting and serverless functions
   - GitHub for version control
   - Vercel KV for data storage

### Vercel KV Data Schema

#### User Management
```typescript
// User object stored at key 'user:{id}'
interface User {
  id: string;              // UUID
  email: string;           // User email
  passwordHash: string;    // Hashed password
  name?: string;           // Optional user name
  createdAt: number;       // Unix timestamp
  role: 'user' | 'admin';  // User role
}
```

#### API Key Management
```typescript
// API key object stored at key 'apikey:{key}'
interface ApiKey {
  key: string;             // The API key itself
  userId: string;          // Associated user ID
  name: string;            // User-defined name
  createdAt: number;       // Timestamp
  lastUsed: number;        // Last usage timestamp
  isActive: boolean;       // Whether key is active
}
```

#### Usage Tracking
```typescript
// Monthly usage metrics stored at 'usage:{userId}:{YYYY-MM}'
interface MonthlyUsage {
  userId: string;          // User ID
  month: string;           // YYYY-MM
  requestCount: number;    // Total requests
  tokensUsed: number;      // Total OpenAI tokens
  matchesGenerated: number; // Total matches created
}
```

### Authentication and API Key Flow

1. **User Registration**
   - User registers via dashboard
   - Email/password stored in Vercel KV
   - User redirected to dashboard

2. **API Key Generation**
   - User generates API key via dashboard
   - System creates unique key and stores in Vercel KV
   - Key displayed to user once for copying
   - API key listed in user's dashboard

3. **API Usage**
   - Client application includes API key in requests
   - Server validates key against Vercel KV
   - If valid, processes request and updates usage metrics
   - Returns results to client

### Example API Usage

#### Matching API Request
```json
{
  "apiKey": "circuit_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "players": [
    {
      "id": "player1",
      "interests": ["FPS", "RPG", "Strategy"],
      "skillLevel": "intermediate",
      "language": "en",
      "communicationStyle": "chatty",
      "platformPreference": "PC",
      "contentTolerance": "moderate",
      "playTime": {
        "weekdays": ["20:00-23:00"],
        "weekends": ["14:00-02:00"]
      }
    },
    // Additional players...
  ],
  "groupSize": 4,
  "optimizationGoal": "social" // or "skill", "balanced"
}
```

#### Response Format
```json
{
  "matchId": "match-123",
  "groups": [
    {
      "groupId": "group1",
      "players": ["player1", "player4", "player7", "player9"],
      "compatibilityScore": 85,
      "riskFactors": ["skill gap"]
    },
    // Additional groups...
  ],
  "timestamp": "2025-02-15T14:30:00Z"
}
```

### Dashboard Features

1. **Account Management**
   - User profile settings
   - Password change functionality
   - Account usage overview

2. **API Key Management**
   - Create new API keys
   - View existing keys
   - Revoke/regenerate keys
   - Name and tag keys for organization

3. **Usage Analytics**
   - Request volume over time
   - Token usage tracking
   - Cost estimation
   - Quota management

4. **Documentation**
   - API reference
   - Integration guides
   - Code examples
   - Best practices

### Integration Guidelines
1. **API Integration**
   - Use standard REST API calls
   - Include API key in requests
   - Provide complete player profiles
   - Specify desired group size and optimization goal

2. **Data Requirements**
   - Player IDs must be unique
   - Minimum player attributes: id, interests, skillLevel, language
   - Recommended additional attributes: communicationStyle, platformPreference, contentTolerance
   - Optional attributes: playTime, theme preferences, etc.

### Error Handling
1. **Standard Error Responses**
   - 400: Invalid request format
   - 401: Invalid API key
   - 422: Validation error (e.g., not enough players)
   - 500: Server error or OpenAI API failure

2. **Fallback Algorithm**
   - Circuit includes a fallback algorithm when OpenAI is unavailable
   - Less accurate but ensures service continuity
   - Automatically used when OpenAI API fails or times out

### Performance Considerations
1. **Response Time**
   - Target: <1000ms for matching requests
   - Current average: ~1500ms for complex matching
   - Optimization in progress

2. **Reliability**
   - Fallback algorithms ensure service availability
   - Error handling for all edge cases
   - Timeout management for API calls

3. **Cost Management**
   - Caching optimized for minimal token usage
   - Usage tracking for cost control
   - Rate limiting to prevent abuse

### Security Considerations
1. **Authentication Security**
   - HTTPS for all connections
   - Password hashing with bcrypt
   - CSRF protection
   - Rate limiting for login attempts

2. **API Key Security**
   - Keys follow modern security patterns
   - Prefix-based key identification
   - Key revocation capabilities
   - Usage restrictions by key type

3. **Privacy**
   - No long-term storage of player data
   - All processing happens within request-response cycle
   - Anonymized player identifiers recommended
   - Usage data stored with minimal identifiable information

### Future Considerations
1. **Potential Enhancements**
   - Voice analysis integration
   - Feedback-based optimization
   - Advanced behavioral tracking
   - Custom algorithm configurations
   - Team plans with shared access

### Challenges & Lessons Learned
1. **Vercel KV Implementation**
   - Designing effective key patterns for relational-like lookups
   - Managing concurrency with distributed KV store
   - Finding balance between data normalization and access patterns

2. **OpenAI Integration**
   - Prompt engineering crucial for consistent results
   - Token usage optimization important for cost management
   - Fallback mechanisms essential for production reliability

3. **API Key Management**
   - Balancing security with usability
   - Designing effective key format and validation
   - Implementing proper storage and retrieval patterns 