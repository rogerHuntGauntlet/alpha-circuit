# Circuit - Intelligent Gaming Matchmaking Platform

Circuit is an advanced matchmaking platform that uses machine learning to enhance player experiences through intelligent social matching and behavioral analysis.

## Overview

Circuit provides gaming companies with powerful APIs to match players based on compatibility factors including:
- Personality and communication style
- Voice analysis and emotional patterns
- Gaming preferences and behaviors
- Time patterns and availability
- Content tolerance and language preferences

## Key Features

- **AI-Powered Matching**: Create optimized groups based on multiple compatibility factors
- **Voice Analysis**: Track emotional states, toxicity, and engagement through voice patterns
- **Behavioral Tracking**: Analyze player interactions and preferences over time
- **Health-Focused Design**: Promote healthy gaming habits through session monitoring
- **Comprehensive API**: Easy integration with existing gaming platforms

## Technical Stack

Circuit is built with modern web technologies for performance, scalability, and developer experience:

- **Frontend Framework**: [Next.js](https://nextjs.org/) (React-based framework)
- **Hosting Platform**: [Vercel](https://vercel.com/)
- **Machine Learning**: [OpenAI API](https://openai.com/)
- **Database**: Vercel KV (Redis) for caching, Postgres for persistent data
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Type Safety**: TypeScript
- **Validation**: Zod
- **Styling**: Tailwind CSS

## Implementation Approach

The platform is developed using a phased approach:

1. **Core Infrastructure**: Authentication, API structure, database schema
2. **Base Functionality**: Profile management, basic matching algorithm
3. **Advanced Features**: Voice analysis, machine learning components
4. **Optimization**: Performance tuning, scaling, monitoring

OpenAI's API is leveraged for key machine learning components:
- Text embeddings for profile matching
- GPT models for personality analysis
- Whisper for voice transcription and analysis
- Content moderation for toxicity detection

## Repository Structure

- `/research`: Contains design documents and development strategy
  - `design_doc.md`: Comprehensive platform design document
  - `development_strategy.md`: Implementation roadmap and technical checklist
  - `pd.md`: Machine learning variables and analysis parameters
  - `technical_architecture.md`: Detailed technical specifications
  - `implementation_plan.md`: Step-by-step development plan
- `/examples`: Sample code for key functionality
- `/app`: Next.js application (to be implemented)

## Getting Started

Documentation for API integration and implementation guidelines will be available in the future.

## Development Setup

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys and configuration

# Start the development server
npm run dev
```

## License

Proprietary. All rights reserved.

# Alpha Algorithm API Documentation

## API Endpoints

The Alpha Algorithm API provides several endpoints for player matching and group formation:

### Main Matching API (POST)

```
https://alpha-circuit.vercel.app/api/matching
```

This endpoint uses a basic algorithm to group players based on compatibility.

#### Request Format:

```json
{
  "apiKey": "test-key",
  "players": [
    {
      "id": "player1",
      "interests": ["RPG", "Strategy", "FPS"],
      "communicationStyle": "casual",
      "platformPreference": "PC",
      "playTimes": ["evening", "weekend"],
      "language": "en",
      "skillLevel": 7,
      "contentTolerance": 8,
      "themePreference": "Action"
    },
    {
      "id": "player2",
      "interests": ["RPG", "MOBA", "Strategy"],
      "communicationStyle": "competitive",
      "platformPreference": "PC",
      "playTimes": ["evening", "night"],
      "language": "en",
      "skillLevel": 8,
      "contentTolerance": 6,
      "themePreference": "Action"
    }
  ],
  "groupSize": 2,
  "optimizationGoal": "balanced"
}
```

#### Response Format:

```json
{
  "groups": [
    {
      "groupId": "group1",
      "players": ["player1", "player2"],
      "compatibilityScore": 85,
      "commonInterests": ["RPG", "Strategy"],
      "compatibilityFactors": {
        "interests": "high",
        "communicationStyle": "medium",
        "playTimes": "high",
        "skillLevel": "high"
      }
    }
  ],
  "timestamp": "2023-06-15T12:34:56.789Z",
  "quality": 85
}
```

### AI-Powered Matching API (POST)

```
https://alpha-circuit.vercel.app/api/matching/ai
```

This enhanced endpoint uses OpenAI to create optimal player groups with more sophisticated analysis.

#### Request Format:
Same as the main matching API, with optional `pastBehavior` field:

```json
{
  "apiKey": "test-key",
  "players": [
    {
      "id": "player1",
      "interests": ["RPG", "Strategy", "FPS"],
      "communicationStyle": "casual",
      "platformPreference": "PC",
      "playTimes": ["evening", "weekend"],
      "language": "en",
      "skillLevel": 7,
      "contentTolerance": 8,
      "themePreference": "Action",
      "pastBehavior": {
        "toxicityReports": 0,
        "friendRequests": 5
      }
    },
    // More players...
  ],
  "groupSize": 2,
  "optimizationGoal": "balanced"
}
```

#### Response Format:

```json
{
  "groups": [
    {
      "groupId": "group1",
      "players": ["player1", "player2"],
      "compatibilityScore": 85,
      "commonInterests": ["RPG", "Strategy"],
      "compatibilityFactors": {
        "interests": "high",
        "communicationStyle": "medium",
        "playTimes": "high",
        "skillLevel": "high"
      },
      "riskFactors": ["Platform differences may affect collaboration"]
    }
  ],
  "timestamp": "2023-06-15T12:34:56.789Z",
  "quality": 85,
  "aiPowered": true
}
```

### Test Endpoint (GET)

```
https://alpha-circuit.vercel.app/api/matching/test?apiKey=test-key
```

This endpoint returns a sample response for testing purposes.

### Direct Access Endpoint (GET)

```
https://alpha-circuit.vercel.app/api/matching/direct
```

This endpoint returns a sample response without requiring authentication.

## Authentication

The API uses API keys for authentication. Valid test keys include:
- `test-key`
- `dev-key-123`
- `prod-key-456`
- `gauntlet-api-key`

## Testing with cURL

### Basic Matching API:

```bash
curl -X POST "https://alpha-circuit.vercel.app/api/matching" \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "test-key",
    "players": [
      {
        "id": "player1",
        "interests": ["RPG", "Strategy", "FPS"],
        "communicationStyle": "casual",
        "platformPreference": "PC",
        "playTimes": ["evening", "weekend"],
        "language": "en",
        "skillLevel": 7,
        "contentTolerance": 8,
        "themePreference": "Action"
      },
      {
        "id": "player2",
        "interests": ["RPG", "MOBA", "Strategy"],
        "communicationStyle": "competitive",
        "platformPreference": "PC",
        "playTimes": ["evening", "night"],
        "language": "en",
        "skillLevel": 8,
        "contentTolerance": 6,
        "themePreference": "Action"
      }
    ],
    "groupSize": 2,
    "optimizationGoal": "balanced"
  }'
```

### AI-Powered Matching API:

```bash
curl -X POST "https://alpha-circuit.vercel.app/api/matching/ai" \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "test-key",
    "players": [
      {
        "id": "player1",
        "interests": ["RPG", "Strategy", "FPS"],
        "communicationStyle": "casual",
        "platformPreference": "PC",
        "playTimes": ["evening", "weekend"],
        "language": "en",
        "skillLevel": 7,
        "contentTolerance": 8,
        "themePreference": "Action",
        "pastBehavior": {
          "toxicityReports": 0,
          "friendRequests": 5
        }
      },
      {
        "id": "player2",
        "interests": ["RPG", "MOBA", "Strategy"],
        "communicationStyle": "competitive",
        "platformPreference": "PC",
        "playTimes": ["evening", "night"],
        "language": "en",
        "skillLevel": 8,
        "contentTolerance": 6,
        "themePreference": "Action",
        "pastBehavior": {
          "toxicityReports": 1,
          "friendRequests": 3
        }
      }
    ],
    "groupSize": 2,
    "optimizationGoal": "balanced"
  }'
```

### Test Endpoint:

```bash
curl "https://alpha-circuit.vercel.app/api/matching/test?apiKey=test-key"
```

### Direct Access Endpoint:

```bash
curl "https://alpha-circuit.vercel.app/api/matching/direct"
```

## Testing with Postman

You can also use Postman to test the API. Import the provided Postman collection file:
```
alpha-algorithm-api.postman_collection.json
```

## Error Handling

The API returns standard HTTP status codes:
- 200: Success
- 400: Bad Request (missing or invalid parameters)
- 401: Unauthorized (missing API key)
- 403: Forbidden (invalid API key)
- 500: Server Error 