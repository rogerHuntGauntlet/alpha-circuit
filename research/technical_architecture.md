# Circuit Technical Architecture

## Hybrid Architecture Overview

Circuit operates with a hybrid architecture approach:
- **Stateless Core**: The matching algorithm itself operates statelessly (request → OpenAI → response)
- **Persistent User Management**: User accounts, API keys, and usage metrics require persistent storage

### Core Technology Stack
- **Frontend Framework**: NextJS (React-based framework)
- **Hosting Platform**: Vercel
- **Machine Learning Provider**: OpenAI API
- **Data Storage**: Vercel KV (Redis) for user accounts, API keys, and usage metrics
- **Caching**: In-memory + Vercel KV for high-volume scenarios

### Implementation Status
- ✅ Core project structure established
- ✅ OpenAI integration utilities implemented
- ✅ Basic API routes created
- ✅ Dashboard UI prototype developed
- ✅ Matching algorithm implemented
- 🔄 Vercel KV integration for user management in progress

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Applications                   │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    NextJS Application (Vercel)               │
│                                                             │
│  ┌─────────────────┐    ┌──────────────┐    ┌────────────┐  │
│  │   API Routes    │◄──►│  Core Logic  │◄──►│  Vercel KV │  │
│  └────────┬────────┘    └──────┬───────┘    └────────────┘  │
│           │                    │                            │
│           │                    │                            │
│           ▼                    ▼                            │
│  ┌─────────────────┐    ┌──────────────┐                   │
│  │   API Key       │    │ ML Services  │                   │
│  │   Validation    │    └──────┬───────┘                   │
│  └─────────────────┘           │                            │
│                                │                            │
└────────────────────────────────┼────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────┐
│                         OpenAI API                          │
└────────────────────────────────────────────────────────────┘
```

## Implementation Approach

### 1. NextJS Application Structure

Current structure:
```
circuit/
├── app/                   # NextJS App Router
│   ├── api/               # API Routes
│   │   ├── matching/      # Matching engine endpoint ✅
│   │   ├── auth/          # Authentication endpoints 🔄
│   │   └── keys/          # API key management 🔄
│   ├── dashboard/         # Client dashboard prototype ✅
│   └── login/             # Authentication UI 🔄
├── lib/                   # Shared utilities
│   ├── openai/            # OpenAI integration utilities ✅
│   ├── matching/          # Matching algorithms ✅
│   ├── auth/              # Authentication utilities 🔄
│   └── kv/                # Vercel KV utilities 🔄
├── public/                # Static assets
└── examples/              # Example implementations
```

### 2. Data Storage with Vercel KV

#### User Management
```typescript
// User data structure
interface User {
  id: string;          // UUID
  email: string;       // User email
  passwordHash: string; // Hashed password
  createdAt: number;   // Timestamp
}

// Key: `user:${email}` → Value: User
```

#### API Key Management
```typescript
// API key data structure
interface ApiKey {
  key: string;         // The API key itself
  userId: string;      // Associated user ID
  name: string;        // User-defined name for the key
  createdAt: number;   // Timestamp
  lastUsed: number;    // Last usage timestamp
}

// Key: `apikey:${key}` → Value: ApiKey
```

#### Usage Tracking
```typescript
// Usage data structure
interface Usage {
  userId: string;       // User ID
  apiKey: string;       // API key used
  requestCount: number; // Number of requests
  tokenCount: number;   // Number of OpenAI tokens used
  lastUpdated: number;  // Timestamp
}

// Key: `usage:${userId}:${YYYY-MM}` → Value: Usage for monthly tracking
```

### 3. Core Request Flow

1. **Client Authentication**
   - User registers/logs in through dashboard
   - User generates API key(s)
   
2. **Client API Request**
   - Client application sends request with API key
   - System validates API key against Vercel KV
   - If invalid, returns auth error
   
3. **Request Processing**
   - Validates input data structure
   - Prepares data for OpenAI
   - Increments usage counters in Vercel KV
   
4. **OpenAI API Call**
   - Send optimized prompt with player data
   - Receive matching recommendations
   
5. **Response Formatting**
   - Format OpenAI response into standardized output
   - Return JSON response to client
   - Update usage metrics in Vercel KV

### 4. Authentication Flow

1. **User Registration**
   - User submits email/password
   - System hashes password
   - Stores user in Vercel KV
   - Sends verification email (optional)

2. **User Login**
   - User submits credentials
   - System validates against Vercel KV
   - Issues session token using NextAuth.js
   - Redirects to dashboard

3. **API Key Generation**
   - User requests new API key from dashboard
   - System generates unique key
   - Stores in Vercel KV with user association
   - Returns key to user (shown only once)

### 5. OpenAI Integration

Circuit leverages OpenAI's API for machine learning components:

#### Profile Analysis
- ✅ Embedding generation utilities implemented
- ✅ Profile similarity framework created

#### Matching Algorithms
- ✅ Basic matching algorithm implemented
- ✅ OpenAI-based group optimization utilities created
- ✅ Simple in-memory caching for cost efficiency

### 6. API Endpoints

#### Current Status

#### Authentication
- 🔄 `POST /api/auth/register` - Register new user
- 🔄 `POST /api/auth/login` - Authenticate user
- 🔄 `GET /api/auth/logout` - Log out user

#### API Key Management
- 🔄 `POST /api/keys/create` - Generate new API key
- 🔄 `GET /api/keys/list` - List user's API keys
- 🔄 `DELETE /api/keys/:id` - Revoke API key

#### Matching
- ✅ `POST /api/matching` - Create match groups

```typescript
// Example request body:
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
    // More players...
  ],
  "groupSize": 4,
  "optimizationGoal": "social" // or "skill", "balanced"
}

// Example response:
{
  "matchId": "match-123",
  "groups": [
    {
      "groupId": "group1",
      "players": ["player1", "player4", "player7", "player9"],
      "compatibilityScore": 85,
      "riskFactors": ["skill gap"]
    },
    // More groups...
  ],
  "timestamp": "2025-02-15T14:30:00Z"
}
```

### 7. Deployment Strategy

Current Status:
- ✅ Local development setup complete
- 🔄 Vercel KV configuration in progress
- ⏳ Vercel deployment planned

### 8. Vercel KV Configuration

For local development:
```bash
# Install dependencies
npm install @vercel/kv

# Set up environment variables
VERCEL_KV_URL=...
VERCEL_KV_REST_API_URL=...
VERCEL_KV_REST_API_TOKEN=...
VERCEL_KV_REST_API_READ_ONLY_TOKEN=...
```

Usage example:
```typescript
import { kv } from '@vercel/kv'

// Store data
await kv.set('user:alice@example.com', { id: 'user_123', email: 'alice@example.com' })

// Retrieve data
const user = await kv.get('user:alice@example.com')

// Delete data
await kv.del('user:alice@example.com')
```

### 9. Scaling Considerations

Key Optimizations Implemented:
- ✅ Simple in-memory caching to reduce OpenAI API costs
- ✅ Fallback matching algorithm implemented
- ✅ API request/response validation
- 🔄 Vercel KV for persistent storage with automatic scaling

## Next Steps

1. Complete Vercel KV integration for user management
2. Implement authentication system using NextAuth.js
3. Build API key management functionality
4. Develop dashboard for usage analytics
5. Refine OpenAI prompts for better matching
6. Set up Vercel deployment
7. Create comprehensive API documentation 