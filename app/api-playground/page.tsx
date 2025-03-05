'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MatchmakingVisualizer } from '../components/matchmaker';
import { PlayerModal } from '../components/PlayerModal';
import { ScenarioHistory } from '../components/ScenarioHistory';

// Random player generation utilities
const randomFromArray = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateRandomPlayer = () => {
  const interests = ['RPG', 'Strategy', 'FPS', 'MOBA', 'MMORPG', 'Sports', 'Racing', 'Puzzle', 'Card Games'];
  const communicationStyles = ['quiet', 'moderate', 'chatty'];
  const platforms = ['PC', 'Console', 'Mobile'];
  const playTimes = ['morning', 'afternoon', 'evening', 'night', 'weekend'];
  const languages = ['en', 'es', 'fr', 'de', 'ja'];
  const themes = ['Action', 'Neutral', 'Soothing'];

  // Generate 1-3 random interests
  const numInterests = Math.floor(Math.random() * 3) + 1;
  const selectedInterests = new Set<string>();
  while (selectedInterests.size < numInterests) {
    selectedInterests.add(randomFromArray(interests));
  }

  // Generate 1-2 random play times
  const numPlayTimes = Math.floor(Math.random() * 2) + 1;
  const selectedPlayTimes = new Set<string>();
  while (selectedPlayTimes.size < numPlayTimes) {
    selectedPlayTimes.add(randomFromArray(playTimes));
  }

  return {
    id: `player${Date.now()}`,
    interests: Array.from(selectedInterests),
    communicationStyle: randomFromArray(communicationStyles),
    platformPreference: randomFromArray(platforms),
    playTimes: Array.from(selectedPlayTimes),
    language: randomFromArray(languages),
    skillLevel: Math.floor(Math.random() * 10) + 1,
    contentTolerance: Math.floor(Math.random() * 10) + 1,
    themePreference: randomFromArray(themes)
  };
};

interface Scenario {
  id: string;
  timestamp: string;
  request: {
    players: any[];
    groupSize: number;
    optimizationGoal: string;
    systemPrompt?: string;
  };
  response: {
    aiPowered: boolean;
    quality: number;
    groups: any[];
    algorithmStatus?: {
      attempted: Array<{
        type: string;
        success: boolean;
        error?: {
          code: string;
          message: string;
        };
      }>;
      final: string;
    };
  };
}

export default function ApiPlayground() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestBody, setRequestBody] = useState(`{
  "apiKey": "",
  "players": [
    {
      "id": "player1",
      "interests": ["RPG", "Strategy"],
      "communicationStyle": "chatty",
      "platformPreference": "PC",
      "playTimes": ["evening", "weekend"],
      "language": "en",
      "skillLevel": 7,
      "contentTolerance": 5,
      "themePreference": "Action"
    }
  ],
  "groupSize": 2,
  "optimizationGoal": "social"
}`);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [showJson, setShowJson] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scenarios, setScenarios] = useState<Scenario[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('matchmaking-scenarios');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Fetch API key when session is available
  React.useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetchApiKey();
    }
  }, [status, session]);

  // Save scenarios to localStorage whenever they change
  useEffect(() => {
    if (scenarios.length > 0) {
      localStorage.setItem('matchmaking-scenarios', JSON.stringify(scenarios));
    }
  }, [scenarios]);

  const fetchApiKey = async () => {
    try {
      const response = await fetch('/api/user');
      if (!response.ok) {
        throw new Error('Failed to fetch API key');
      }
      const data = await response.json();
      
      // Update the API key in the request body
      const updatedRequestBody = JSON.parse(requestBody);
      updatedRequestBody.apiKey = data.apiKey;
      
      setApiKey(data.apiKey);
      setRequestBody(JSON.stringify(updatedRequestBody, null, 2));
    } catch (err) {
      console.error('Error fetching API key:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Parse the request body to validate JSON
      const parsedBody = JSON.parse(requestBody);
      
      // Add system prompt to the request if provided
      if (systemPrompt.trim()) {
        parsedBody.systemPrompt = systemPrompt.trim();
      }
      
      // Make the API call to the AI endpoint
      const response = await fetch('/api/matching/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedBody),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request');
      }
      
      setResponse(data);

      // Save the scenario
      const newScenario: Scenario = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        request: parsedBody,
        response: data
      };
      setScenarios(prev => [newScenario, ...prev]);

    } catch (err: any) {
      console.error('Error in API call:', err);
      setError(err.message || 'An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(requestBody);
      setRequestBody(JSON.stringify(parsed, null, 2));
    } catch (err) {
      // If it's not valid JSON, don't format it
      console.error('Invalid JSON:', err);
    }
  };

  const loadScenario = (scenario: Scenario) => {
    setRequestBody(JSON.stringify(scenario.request, null, 2));
    setSystemPrompt(scenario.request.systemPrompt || '');
    setResponse(scenario.response);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">API Playground</h1>
          <div className="flex items-center">
            {status === 'authenticated' ? (
              <>
                <span className="mr-4 text-gray-600">
                  Welcome, {session?.user?.name || session?.user?.email || 'User'}
                </span>
                <Link 
                  href="/dashboard"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium mr-2"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => router.push('/api/auth/signout')}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/dashboard"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium mr-2"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => router.push('/auth/signin')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                API Playground
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Test our AI-powered matching service.
              </p>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="systemPrompt" className="block text-sm font-medium text-gray-700 mb-2">
                    System Prompt
                  </label>
                  <div className="relative">
                    <textarea
                      id="systemPrompt"
                      name="systemPrompt"
                      rows={4}
                      className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md font-mono bg-gray-50 p-4"
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      placeholder="Add any additional context or special instructions for the matching service here..."
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Use this space to provide extra context or specific requirements that should influence the matching process. For example: "Prioritize matching players with complementary play styles" or "Consider timezone differences more heavily".
                  </p>
                </div>

                <div className="mb-6">
                  <label htmlFor="requestBody" className="block text-sm font-medium text-gray-700 mb-2">
                    Request Body
                  </label>
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const currentBody = JSON.parse(requestBody);
                          if (currentBody.players.length >= 20) {
                            setError('Maximum of 20 players allowed');
                            return;
                          }
                          const newPlayer = generateRandomPlayer();
                          currentBody.players = [...currentBody.players, newPlayer];
                          setRequestBody(JSON.stringify(currentBody, null, 2));
                        } catch (err) {
                          setError('Failed to parse current request body');
                        }
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Add Random Player
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const currentBody = JSON.parse(requestBody);
                          if (currentBody.players.length >= 20) {
                            setError('Maximum of 20 players allowed');
                            return;
                          }
                          setIsModalOpen(true);
                        } catch (err) {
                          setError('Failed to parse current request body');
                        }
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Create Player
                    </button>
                    <select
                      onChange={(e) => {
                        try {
                          const currentBody = JSON.parse(requestBody);
                          currentBody.groupSize = parseInt(e.target.value);
                          setRequestBody(JSON.stringify(currentBody, null, 2));
                        } catch (err) {
                          setError('Failed to parse current request body');
                        }
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700"
                      defaultValue="2"
                    >
                      {[2, 3, 4, 5].map((size) => (
                        <option key={size} value={size}>
                          Group Size: {size}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(e) => {
                        try {
                          const currentBody = JSON.parse(requestBody);
                          currentBody.optimizationGoal = e.target.value;
                          setRequestBody(JSON.stringify(currentBody, null, 2));
                        } catch (err) {
                          setError('Failed to parse current request body');
                        }
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700"
                      defaultValue="social"
                    >
                      <option value="social">Social Optimization</option>
                      <option value="skill">Skill Optimization</option>
                      <option value="balanced">Balanced Optimization</option>
                    </select>
                  </div>
                  <div className="relative">
                    <textarea
                      id="requestBody"
                      name="requestBody"
                      rows={20}
                      className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md font-mono bg-gray-50 p-4"
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={formatJson}
                      className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                    >
                      Format
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Edit the JSON request body above to test different scenarios.
                  </p>
                </div>
                
                <PlayerModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={(player) => {
                    try {
                      const currentBody = JSON.parse(requestBody);
                      currentBody.players = [...currentBody.players, player];
                      setRequestBody(JSON.stringify(currentBody, null, 2));
                      setIsModalOpen(false);
                    } catch (err) {
                      setError('Failed to parse current request body');
                    }
                  }}
                />
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        AI Processing...
                      </>
                    ) : (
                      'Process with AI'
                    )}
                  </button>
                </div>
              </form>
              
              {error && (
                <div className="mt-6 bg-red-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {response && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Response</h3>
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`mr-2 px-2 py-1 text-sm rounded-full ${
                          response.aiPowered 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {response.aiPowered ? 'AI-Powered Match' : 'Basic Algorithm Match'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Overall Match Quality: {response.quality}%
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  
                  {response.groups && !showJson && (
                    <div className="mb-6">
                      <MatchmakingVisualizer 
                        groups={response.groups.map((group: { compatibilityScore?: number }) => ({
                          ...group,
                          compatibilityScore: group.compatibilityScore || 0
                        }))}
                        onGroupsUpdate={(newGroups) => {
                          setResponse({
                            ...response,
                            groups: newGroups
                          });
                        }}
                        algorithmStatus={response.algorithmStatus}
                      />
                    </div>
                  )}

                  {showJson && (
                    <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-white whitespace-pre-wrap">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Scenario History */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Scenario History
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  View and reload previous matchmaking scenarios.
                </p>
              </div>
              {scenarios.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all scenarios?')) {
                      setScenarios([]);
                      localStorage.removeItem('matchmaking-scenarios');
                    }
                  }}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                >
                  Clear History
                </button>
              )}
            </div>
            
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <ScenarioHistory
                  scenarios={scenarios}
                  onLoadScenario={loadScenario}
                />
              </div>
            </div>
          </div>

          {/* API Documentation */}
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                API Documentation
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Quick reference for the Circuit Matching API.
              </p>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="prose max-w-none">
                <h4 className="text-base font-medium text-gray-900 mb-2">Endpoint</h4>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm mb-4">
                  POST https://alpha-circuit.vercel.app/api/matching
                </div>
                
                <h4 className="text-base font-medium text-gray-900 mb-2">Required Parameters</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-4">
                  <li><span className="font-mono text-gray-800">apiKey</span> - Your API key</li>
                  <li><span className="font-mono text-gray-800">players</span> - Array of player objects</li>
                  <li><span className="font-mono text-gray-800">groupSize</span> - Number of players per group</li>
                  <li><span className="font-mono text-gray-800">optimizationGoal</span> - "social", "skill", or "balanced"</li>
                </ul>
                
                <h4 className="text-base font-medium text-gray-900 mb-2">Player Object Properties</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-4">
                  <li><span className="font-mono text-gray-800">id</span> - Unique player identifier</li>
                  <li><span className="font-mono text-gray-800">interests</span> - Array of strings</li>
                  <li><span className="font-mono text-gray-800">communicationStyle</span> - "quiet", "moderate", or "chatty"</li>
                  <li><span className="font-mono text-gray-800">platformPreference</span> - "pc", "console", "mobile", etc.</li>
                  <li><span className="font-mono text-gray-800">playTimes</span> - Array of strings like "evening", "weekend"</li>
                  <li><span className="font-mono text-gray-800">language</span> - Language preference</li>
                  <li><span className="font-mono text-gray-800">skillLevel</span> - Number from 1-10</li>
                  <li><span className="font-mono text-gray-800">contentTolerance</span> - Number from 1-10</li>
                  <li><span className="font-mono text-gray-800">themePreference</span> - "Action", "Neutral", "Soothing", etc.</li>
                </ul>
                
                <div className="flex justify-end mt-4">
                  <Link 
                    href="/dashboard"
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 