'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Define types for our user data
interface UserStats {
  totalMatches: number;
  apiUsage: number;
  averageMatchQuality: number;
}

interface Match {
  id: string;
  status: string;
  details: string;
  createdAt: string;
}

interface UserData {
  apiKey: string;
  stats: UserStats;
  recentMatches: Match[];
  totalMatchCount: number;
  currentPage: number;
  totalPages: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    apiKey: '',
    stats: {
      totalMatches: 0,
      apiUsage: 0,
      averageMatchQuality: 0
    },
    recentMatches: [],
    totalMatchCount: 0,
    currentPage: 1,
    totalPages: 1
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data when session is available
    if (status === 'authenticated' && session?.user) {
      // Fetch user-specific data from our API
      fetchUserData();
    } else if (status === 'unauthenticated') {
      // Set sample data for unauthenticated users
      setUserData({
        apiKey: 'circuit_************************',
        stats: {
          totalMatches: 12,
          apiUsage: 47,
          averageMatchQuality: 85
        },
        recentMatches: [
          {
            id: 'sample-1',
            status: 'completed',
            details: '24 players • 6 groups • social optimization',
            createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
          },
          {
            id: 'sample-2',
            status: 'completed',
            details: '16 players • 4 groups • skill optimization',
            createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
          },
          {
            id: 'sample-3',
            status: 'completed',
            details: '32 players • 8 groups • balanced optimization',
            createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
          }
        ],
        totalMatchCount: 12,
        currentPage: 1,
        totalPages: 1
      });
      setIsLoading(false);
    }
  }, [status, session, router]);

  // Function to fetch user data from our API
  const fetchUserData = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user?page=${page}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Handle the case where there's no data yet
      if (data.recentMatches.length === 0 && data.stats.totalMatches === 0) {
        setUserData({
          ...data,
          stats: {
            totalMatches: 0,
            apiUsage: 0,
            averageMatchQuality: 0
          }
        });
      } else {
        setUserData(data);
      }
      
      setCurrentPage(data.currentPage);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch user data:', err);
      setError('Failed to load your dashboard data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to copy API key to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('API key copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Function to generate a new API key
  const generateNewApiKey = async () => {
    try {
      setIsGeneratingKey(true);
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error generating API key: ${response.statusText}`);
      }
      
      const data = await response.json();
      // Update the API key in our userData state
      setUserData(prevData => ({
        ...prevData,
        apiKey: data.apiKey
      }));
      alert('New API key generated successfully!');
    } catch (err: any) {
      console.error('Failed to generate new API key:', err);
      alert('Failed to generate new API key. Please try again later.');
    } finally {
      setIsGeneratingKey(false);
    }
  };

  // Function to handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= userData.totalPages) {
      fetchUserData(newPage);
    }
  };

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (isLoading && !userData.recentMatches.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Loading your dashboard...</h2>
          <div className="mt-4 w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => fetchUserData()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= userData.totalPages; i++) {
    if (
      i === 1 || 
      i === userData.totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      paginationItems.push(i);
    } else if (
      (i === 2 && currentPage > 3) || 
      (i === userData.totalPages - 1 && currentPage < userData.totalPages - 2)
    ) {
      paginationItems.push('ellipsis');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Circuit Dashboard</h1>
          <div className="flex items-center">
            {status === 'authenticated' ? (
              <>
                <span className="mr-4 text-gray-600">
                  Welcome, {session?.user?.name || session?.user?.email || 'User'}
                </span>
                <Link 
                  href="/documentation"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium mr-2"
                >
                  API Documentation
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
                  href="/documentation"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium mr-2"
                >
                  API Documentation
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
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Your Total Matches
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {userData.stats.totalMatches}
                  </dd>
                </dl>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Your API Usage
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {userData.stats.apiUsage.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Your Average Match Quality
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {userData.stats.averageMatchQuality > 0 ? `${userData.stats.averageMatchQuality}%` : 'N/A'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          
          {status === 'unauthenticated' && (
            <div className="mb-8 bg-indigo-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-indigo-700">
                    You're viewing a demo of the Circuit dashboard. Sign in to get your own API key and start using our matching service.
                  </p>
                  <p className="mt-3 text-sm md:mt-0 md:ml-6">
                    <button 
                      onClick={() => router.push('/auth/signin')}
                      className="whitespace-nowrap font-medium text-indigo-700 hover:text-indigo-600"
                    >
                      Sign in now <span aria-hidden="true">&rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {userData.stats.totalMatches === 0 && userData.stats.apiUsage === 0 && status === 'authenticated' && (
            <div className="mb-8 bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">
                    Your dashboard will show real-time statistics once you start using your API key. Use the API key shown below to make requests to our API.
                  </p>
                  <p className="mt-3 text-sm md:mt-0 md:ml-6">
                    <a href="https://docs.circuit.com" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                      View API docs <span aria-hidden="true">&rarr;</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* API Keys */}
          <div className="mb-8 bg-white shadow overflow-hidden sm:rounded-lg relative">
            {status === 'unauthenticated' && (
              <div className="absolute inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center z-10">
                <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Get Your API Key</h3>
                  <p className="text-gray-600 mb-4">Sign in to get your own API key and start using our matching service.</p>
                  <button 
                    onClick={() => router.push('/auth/signin')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Your API Keys
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Your personal API key for integrating with Circuit.
                </p>
              </div>
              <button
                type="button"
                onClick={generateNewApiKey}
                disabled={isGeneratingKey || status === 'unauthenticated'}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isGeneratingKey || status === 'unauthenticated' ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isGeneratingKey ? 'Generating...' : 'Generate New Key'}
              </button>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Your API Key
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded mr-2 overflow-x-auto max-w-xs">
                        {userData.apiKey}
                      </span>
                      <button 
                        onClick={() => copyToClipboard(userData.apiKey)}
                        disabled={status === 'unauthenticated'}
                        className={`text-indigo-600 hover:text-indigo-900 whitespace-nowrap ${status === 'unauthenticated' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Copy
                      </button>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          {/* API Documentation */}
          <div className="mb-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                API Documentation
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Learn how to integrate Circuit's matching API into your application.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="prose max-w-none">
                <h4 className="text-base font-medium text-gray-900 mb-2">Quick Start Guide</h4>
                <p className="text-sm text-gray-600 mb-4">
                  To use our API, you'll need to make POST requests to our matching endpoint with your API key and player data.
                </p>
                
                <h4 className="text-base font-medium text-gray-900 mb-2">Endpoint</h4>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm mb-4">
                  POST https://api.circuit.com/api/matching
                </div>
                
                <h4 className="text-base font-medium text-gray-900 mb-2">Request Structure</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Your request must include your API key and conform to the following structure:
                </p>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm mb-4 overflow-x-auto">
                  {`{
  "apiKey": "your_api_key",
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
    // more players...
  ],
  "groupSize": 4,
  "optimizationGoal": "social" // or "skill" or "balanced"
}`}
                </div>
                
                <h4 className="text-base font-medium text-gray-900 mb-2">What Happens When You Call Our API</h4>
                <div className="space-y-4 text-sm text-gray-600">
                  <p>
                    When you send a request to our matching API, here's exactly what happens:
                  </p>
                  
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Authentication:</span> We validate your API key to ensure you have access to our service.
                    </li>
                    <li>
                      <span className="font-medium">Request Validation:</span> We check that your request contains all required fields and that they're properly formatted.
                    </li>
                    <li>
                      <span className="font-medium">Rate Limiting:</span> We check that you haven't exceeded your rate limit (20 requests per minute).
                    </li>
                    <li>
                      <span className="font-medium">Usage Tracking:</span> We log your API call to your account for your dashboard statistics.
                    </li>
                    <li>
                      <span className="font-medium">AI Processing:</span> Our advanced matching algorithm analyzes your players' data to create optimal groups.
                    </li>
                    <li>
                      <span className="font-medium">Quality Scoring:</span> We calculate a quality score for your match based on how well the groups satisfy your optimization goal.
                    </li>
                    <li>
                      <span className="font-medium">Response Generation:</span> We format the results and send them back to you.
                    </li>
                  </ol>
                  
                  <h5 className="text-base font-medium text-gray-900 mt-4 mb-2">Example Case</h5>
                  
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="font-medium mb-2">Example Request:</p>
                    <div className="bg-gray-100 p-2 rounded font-mono text-xs mb-4 overflow-x-auto">
                      {`// POST to https://api.circuit.com/api/matching
{
  "apiKey": "circuit_a1b2c3d4e5f6g7h8i9j0",
  "players": [
    {
      "id": "player1",
      "interests": ["rpg", "strategy"],
      "communicationStyle": "chatty",
      "platformPreference": "pc",
      "playTimes": ["evening", "weekend"],
      "language": "english",
      "skillLevel": 8,
      "contentTolerance": 7,
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
}`}
                    </div>
                    
                    <p className="font-medium mb-2">Example Response:</p>
                    <div className="bg-gray-100 p-2 rounded font-mono text-xs overflow-x-auto">
                      {`{
  "groups": [
    {
      "groupId": "group1",
      "players": ["player1", "player3"],
      "compatibilityScore": 0.85,
      "commonInterests": ["rpg"],
      "compatibilityFactors": {
        "interests": "high",
        "communicationStyle": "high",
        "playTimes": "medium"
      }
    },
    {
      "groupId": "group2",
      "players": ["player2", "player4"],
      "compatibilityScore": 0.72,
      "commonInterests": [],
      "compatibilityFactors": {
        "interests": "low",
        "communicationStyle": "medium",
        "playTimes": "high"
      }
    }
  ],
  "timestamp": "2023-06-15T14:22:33.456Z",
  "quality": 78
}`}
                    </div>
                    
                    <div className="mt-4 text-sm">
                      <p className="font-medium mb-1">What happened behind the scenes:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>We validated your API key "circuit_a1b2c3d4e5f6g7h8i9j0"</li>
                        <li>We checked your request format and confirmed all required fields</li>
                        <li>We verified you hadn't exceeded your rate limit</li>
                        <li>We logged this API call to your account (visible in your dashboard stats)</li>
                        <li>Our algorithm analyzed the 4 players and created 2 groups of 2 players each</li>
                        <li>We optimized for "social" compatibility as requested</li>
                        <li>We calculated an overall quality score of 78 for this match</li>
                        <li>We stored this match in your history (visible in your recent matches)</li>
                        <li>We returned the formatted response with detailed group information</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-base font-medium text-gray-900 mt-6 mb-2">Rate Limits & Usage</h4>
                <p className="text-sm text-gray-600 mb-2">
                  • Standard accounts: 20 requests per minute<br />
                  • All API usage is tracked and visible in your dashboard<br />
                  • Each successful match is stored in your match history
                </p>
                
                <div className="flex justify-between items-center mt-6">
                  <Link 
                    href="/documentation"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Full Documentation
                  </Link>
                  
                  <Link 
                    href="/api-playground"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Try API Playground
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Matches */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Your Recent Matches
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your most recent matching requests.
              </p>
            </div>
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              </div>
            )}
            {!isLoading && userData.recentMatches.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500">
                You haven't created any matches yet.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {userData.recentMatches.map((match) => (
                  <li key={match.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          Your Match #{match.id.split('-').pop()}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {match.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {match.details}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            Created {formatRelativeTime(match.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === userData.totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === userData.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">{userData.recentMatches.length}</span> of{' '}
                    <span className="font-medium">{userData.totalMatchCount}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {userData.totalPages <= 5 ? (
                      // Show all pages if there are 5 or fewer
                      Array.from({ length: userData.totalPages }).map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === i + 1
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))
                    ) : (
                      // Show pagination with ellipsis for more than 5 pages
                      <>
                        <button
                          onClick={() => handlePageChange(1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === 1
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          1
                        </button>
                        
                        {currentPage > 3 && (
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                        
                        {currentPage !== 1 && currentPage !== userData.totalPages && (
                          <button
                            className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                          >
                            {currentPage}
                          </button>
                        )}
                        
                        {currentPage < userData.totalPages - 2 && (
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                        
                        {userData.totalPages > 1 && (
                          <button
                            onClick={() => handlePageChange(userData.totalPages)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === userData.totalPages
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {userData.totalPages}
                          </button>
                        )}
                      </>
                    )}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === userData.totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 ${currentPage === userData.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 