'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
      "interests": ["rpg", "strategy"],
      "communicationStyle": "chatty",
      "platformPreference": "pc",
      "playTimes": ["evening", "weekend"],
      "language": "english",
      "skillLevel": 7,
      "contentTolerance": 5,
      "themePreference": "Action"
    },
    {
      "id": "player2",
      "interests": ["fps", "moba"],
      "communicationStyle": "quiet",
      "platformPreference": "pc",
      "playTimes": ["evening", "night"],
      "language": "english",
      "skillLevel": 9,
      "contentTolerance": 8,
      "themePreference": "Action"
    },
    {
      "id": "player3",
      "interests": ["rpg", "mmorpg"],
      "communicationStyle": "chatty",
      "platformPreference": "console",
      "playTimes": ["weekend"],
      "language": "spanish",
      "skillLevel": 7,
      "contentTolerance": 5,
      "themePreference": "Neutral"
    },
    {
      "id": "player4",
      "interests": ["strategy", "card games"],
      "communicationStyle": "moderate",
      "platformPreference": "mobile",
      "playTimes": ["morning", "evening"],
      "language": "english",
      "skillLevel": 6,
      "contentTolerance": 4,
      "themePreference": "Soothing"
    }
  ],
  "groupSize": 2,
  "optimizationGoal": "social"
}`);

  // Fetch API key when session is available
  React.useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetchApiKey();
    }
  }, [status, session]);

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
      
      // Make the API call
      const response = await fetch('/api/matching', {
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
                Test the Circuit Matching API
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Use this playground to test API calls and see the responses.
              </p>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              {status === 'unauthenticated' && (
                <div className="mb-6 bg-yellow-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        You're not signed in
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Sign in to use your own API key and save your test results to your account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="requestBody" className="block text-sm font-medium text-gray-700 mb-2">
                    Request Body
                  </label>
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
                        Processing...
                      </>
                    ) : (
                      'Send Request'
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
                  <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-white whitespace-pre-wrap">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                  POST https://api.circuit.com/api/matching
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