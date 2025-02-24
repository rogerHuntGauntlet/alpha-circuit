# Circuit Implementation Plan

This document outlines the step-by-step approach to implementing Circuit as a hybrid service with stateless matching and persistent user management using NextJS, Vercel KV, and OpenAI.

## Current Status (Updated as of February 2025)

- ✅ Project structure established
- ✅ Core OpenAI integration implemented
- ✅ Basic API routes created
- ✅ Matching algorithm implemented
- ✅ Dashboard UI prototype developed
- 🔄 Vercel KV integration in progress

## Hybrid Architecture Approach

Our implementation approach combines:

1. **Stateless Processing**: The core matching algorithm operates on a request-response basis
2. **Persistent User Management**: User accounts, API keys, and usage metrics stored in Vercel KV
3. **Dashboard Interface**: For user account management, API key generation, and analytics viewing

## Phase 1: Project Setup and Core Infrastructure (Completed)

### Week 1-2: Project Initialization

1. **Project Setup**
   - [x] Set up directory structure as outlined in technical architecture
   - [x] Create NextJS project using App Router
   ```bash
   npx create-next-app@latest circuit --ts --tailwind --eslint --app
   ```
   - [x] Set up Git repository
   - [x] Configure ESLint and Prettier

2. **API Foundation**
   - [x] Design API route structure
   - [x] Implement basic request validation (with Zod)
   - [x] Create error handling middleware

3. **OpenAI Integration**
   - [x] Set up OpenAI API client
   ```bash
   npm install openai
   ```
   - [x] Create utility functions for API calls
   - [x] Implement simple caching for cost reduction

## Phase 2: Core Matching Functionality (Completed)

### Week 3-4: Matching Algorithm

1. **Basic Matching Algorithm**
   - [x] Implement group size validation
   - [x] Create basic compatibility scoring
   - [x] Build initial grouping algorithm
   - [x] Develop match result formatter

2. **OpenAI-Enhanced Matching**
   - [x] Design prompt engineering for matching
   - [x] Implement OpenAI-based group evaluation
   - [x] Build simple caching for cost reduction
   - [x] Optimize prompts for better results

3. **Matching API Endpoint**
   - [x] Implement match request handling
   - [x] Create standardized response format
   - [x] Add basic error handling

## Phase 3: User Management System (Current)

### Week 5-6: Vercel KV Integration

1. **Vercel KV Setup**
   - [x] Install Vercel KV package
   ```bash
   npm install @vercel/kv
   ```
   - [x] Configure environment variables for local development
   - [ ] Create utility functions for KV operations
   - [ ] Design data structures for users, keys, and usage

2. **Authentication Implementation**
   - [ ] Install NextAuth.js
   ```bash
   npm install next-auth
   ```
   - [ ] Configure email/password authentication
   - [ ] Create login/registration pages
   - [ ] Implement authentication middleware
   - [ ] Connect authentication to Vercel KV

3. **API Key Management**
   - [ ] Create API key generation functionality
   - [ ] Implement key storage in Vercel KV
   - [ ] Build key validation middleware
   - [ ] Develop key revocation system

### Week 7-8: Dashboard & Analytics

1. **Dashboard Enhancement**
   - [ ] Implement user account management UI
   - [ ] Create API key management interface
   - [ ] Develop usage statistics visualization
   - [ ] Build API documentation section

2. **Usage Tracking**
   - [ ] Create usage tracking middleware
   - [ ] Implement storage in Vercel KV
   - [ ] Build monthly/daily aggregation functions
   - [ ] Develop cost calculation system

3. **Admin Functions**
   - [ ] Create user management interface
   - [ ] Implement usage limits and quotas
   - [ ] Build administrative dashboard
   - [ ] Develop billing integration (future)

## Phase 4: Refinement and Optimization

### Week 9-10: Performance Optimization

1. **Response Time Improvement**
   - [ ] Optimize prompt length and complexity
   - [ ] Implement timeout handling
   - [ ] Add fallback algorithms for API failures
   - [ ] Enhance error reporting

2. **Cost Optimization**
   - [ ] Refine token usage
   - [ ] Implement request deduplication
   - [ ] Optimize embedding generation
   - [ ] Create usage monitoring alerts

3. **Input Validation Enhancement**
   - [ ] Create comprehensive input schemas
   - [ ] Implement detailed error messages
   - [ ] Add request size limitations
   - [ ] Build validation test suite

## Phase 5: Production Readiness

### Week 11-12: Deployment and Documentation

1. **Vercel Deployment**
   - [ ] Configure Vercel project settings
   - [ ] Set up environment variables
   - [ ] Create deployment pipeline
   - [ ] Implement monitoring and logging

2. **API Documentation**
   - [ ] Generate OpenAPI specification
   - [ ] Create API documentation site
   - [ ] Build interactive API examples
   - [ ] Develop client libraries (JS, Python)

3. **Final Touches**
   - [ ] Conduct end-to-end testing
   - [ ] Optimize performance
   - [ ] Finalize documentation
   - [ ] Build landing page and marketing materials

## Key Technical Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "openai": "^4.20.0",
    "zod": "^3.22.0",
    "tailwindcss": "^3.3.0",
    "next-auth": "^4.24.0",
    "@vercel/kv": "^1.0.0",
    "uuid": "^9.0.0",
    "bcryptjs": "^2.4.3"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "eslint": "^8.53.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.1.0"
  }
}
```

## Vercel KV Data Schema

### User Management

```typescript
// User object stored at key 'user:{id}'
interface User {
  id: string;              // UUID v4
  email: string;           // User's email address
  passwordHash: string;    // Bcrypt hashed password
  name?: string;           // Optional user name
  createdAt: number;       // Unix timestamp
  updatedAt: number;       // Unix timestamp
  role: 'user' | 'admin';  // User role
}

// Email lookup stored at key 'email:{email}'
// Value is the user ID for email lookup
```

### API Key Management

```typescript
// API key object stored at key 'apikey:{key}'
interface ApiKey {
  key: string;             // The API key itself
  userId: string;          // User who owns this key
  name: string;            // User-defined name
  createdAt: number;       // Unix timestamp
  lastUsed: number;        // Last usage timestamp
  isActive: boolean;       // Whether key is active
  type: 'test' | 'live';   // Key type
}

// List of key IDs for a user stored at 'userkeys:{userId}'
// Value is array of key strings
```

### Usage Tracking

```typescript
// Monthly usage metrics stored at 'usage:{userId}:{YYYY-MM}'
interface MonthlyUsage {
  userId: string;          // User ID
  month: string;           // YYYY-MM
  requestCount: number;    // Total requests
  tokensUsed: number;      // Total OpenAI tokens
  matchesGenerated: number; // Total matches created
  // More metrics as needed
}

// Daily usage stored at 'dailyusage:{userId}:{YYYY-MM-DD}'
// For more granular tracking
```

## Core Workflows

### User Registration Flow

```
User → Registration Form → Create User in KV → Generate Welcome Email → Dashboard
```

### API Key Generation Flow

```
User → Dashboard → Generate Key → Store in KV → Display to User (once) → Copy to Application
```

### Matching Request Flow

```
Client → API Endpoint → Validate API Key → Process Request → Call OpenAI → Format Response → Update Usage → Return Results
```

## Next Steps and Timeline

1. **Week 5**: Implement Vercel KV for user management
2. **Week 6**: Integrate NextAuth.js for authentication
3. **Week 7**: Build API key management functionality
4. **Week 8**: Develop usage tracking and analytics dashboard
5. **Week 9-10**: Optimize performance and refine user experience
6. **Week 11-12**: Prepare for production deployment

## Key Challenges & Lessons Learned

1. **Vercel KV Structuring**: Designing efficient key-value patterns for relational data
2. **Authentication Security**: Ensuring proper security practices for API key management
3. **OpenAI Cost Management**: Implementing caching to reduce API costs
4. **Usage Tracking**: Balancing detailed analytics with storage efficiency 